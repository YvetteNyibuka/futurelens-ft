/**
 * React Hook for Loading and Processing Health Data
 * Frontend-only solution using CSV datasets
 */

import { useState, useEffect, useMemo } from 'react';
import { loadAllDatasets, generateDataSummary, ParsedDataset, DataSummary } from '../utils/data/csvParser';
import { processHealthData, calculateTrends, ProcessedHealthData } from '../utils/data/healthIndicators';
import { HealthIndicator, Demographics, Vaccination } from '../types/health';

export interface UseHealthDataReturn {
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Raw data
  datasets: ParsedDataset[];
  dataSummary: DataSummary | null;
  
  // Processed data
  healthIndicators: HealthIndicator[];
  demographics: Demographics[];
  vaccinations: Vaccination[];
  trends: any[];
  
  // Helper functions
  refreshData: () => Promise<void>;
  getDataByYear: (year: string) => ParsedDataset[];
  getIndicatorsByCategory: (category: string) => HealthIndicator[];
}

export function useHealthData(): UseHealthDataReturn {
  const [datasets, setDatasets] = useState<ParsedDataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const loadedDatasets = await loadAllDatasets();
      setDatasets(loadedDatasets);
      
      console.log(`Loaded ${loadedDatasets.length} datasets`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading health data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate data summary
  const dataSummary = useMemo(() => {
    if (datasets.length === 0) return null;
    return generateDataSummary(datasets);
  }, [datasets]);

  // Process health data
  const processedData = useMemo((): ProcessedHealthData => {
    if (datasets.length === 0) {
      return {
        demographics: [],
        healthIndicators: [],
        vaccinations: [],
        summaryStats: {
          totalRecords: 0,
          yearsSpanned: [],
          coverageMetrics: {
            births: 0,
            children: 0,
            households: 0,
            women: 0,
            men: 0
          }
        }
      };
    }
    
    return processHealthData(datasets);
  }, [datasets]);

  // Calculate trends
  const trends = useMemo(() => {
    if (processedData.healthIndicators.length === 0) return [];
    return calculateTrends(processedData.healthIndicators);
  }, [processedData.healthIndicators]);

  // Helper functions
  const refreshData = async () => {
    await loadData();
  };

  const getDataByYear = (year: string): ParsedDataset[] => {
    return datasets.filter(dataset => dataset.year === year);
  };

  const getIndicatorsByCategory = (category: string): HealthIndicator[] => {
    return processedData.healthIndicators.filter(
      indicator => indicator.category === category
    );
  };

  return {
    isLoading,
    error,
    datasets,
    dataSummary,
    healthIndicators: processedData.healthIndicators,
    demographics: processedData.demographics,
    vaccinations: processedData.vaccinations,
    trends,
    refreshData,
    getDataByYear,
    getIndicatorsByCategory
  };
}

/**
 * Hook for specific health indicator data formatted for charts
 */
export function useChartData() {
  const { healthIndicators, vaccinations, trends, isLoading } = useHealthData();

  const chartData = useMemo(() => {
    // Child Mortality Trends
    const childMortalityTrends = trends
      .filter(t => t.indicator.toLowerCase().includes('mortality'))
      .map(t => ({
        indicator: t.indicator,
        dataPoints: t.dataPoints.map((d: any) => ({
          year: d.year.toString(),
          rate: d.value,
          target: d.value > 50 ? d.value - 10 : 25 // Dynamic target
        }))
      }));

    // Vaccination Coverage by Year
    const vaccinationByYear = vaccinations.reduce((acc, vacc) => {
      const year = vacc.timeframe.year.toString();
      if (!acc[year]) acc[year] = { year };
      acc[year][vacc.vaccineCode] = vacc.coveragePercentage;
      return acc;
    }, {} as any);

    const vaccinationTrends = Object.values(vaccinationByYear);

    // Health Indicators by Category
    const indicatorsByCategory = healthIndicators.reduce((acc, indicator) => {
      if (!acc[indicator.category]) acc[indicator.category] = [];
      acc[indicator.category].push({
        name: indicator.indicatorName,
        value: indicator.value,
        year: indicator.timeframe.year,
        unit: indicator.unit
      });
      return acc;
    }, {} as any);

    // Provincial comparison (mock for now - would need geo data)
    const provincialComparison = [
      { province: "Kigali", score: 94.2, population: 1.1 },
      { province: "Eastern", score: 87.8, population: 2.6 },
      { province: "Northern", score: 85.4, population: 1.9 },
      { province: "Western", score: 82.1, population: 2.2 },
      { province: "Southern", score: 78.9, population: 2.8 }
    ];

    return {
      childMortalityTrends,
      vaccinationTrends,
      indicatorsByCategory,
      provincialComparison,
      isReady: !isLoading && healthIndicators.length > 0
    };
  }, [healthIndicators, vaccinations, trends, isLoading]);

  return chartData;
}

/**
 * Hook for table data with pagination and filtering
 */
export function useTableData(datasetName?: string) {
  const { datasets, isLoading } = useHealthData();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Get selected dataset
  const selectedDataset = useMemo(() => {
    if (!datasetName || datasets.length === 0) return datasets[0];
    return datasets.find(d => d.name.includes(datasetName)) || datasets[0];
  }, [datasets, datasetName]);

  // Apply filters and sorting
  const processedData = useMemo(() => {
    if (!selectedDataset) return [];
    
    let data = [...selectedDataset.data];
    
    // Apply filters
    if (Object.keys(filters).length > 0) {
      data = data.filter(row => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const rowValue = row[key];
          if (typeof value === 'string') {
            return String(rowValue).toLowerCase().includes(value.toLowerCase());
          }
          return rowValue === value;
        });
      });
    }
    
    // Apply sorting
    if (sortConfig) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        return sortConfig.direction === 'asc' 
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }
    
    return data;
  }, [selectedDataset, filters, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  return {
    data: paginatedData,
    totalRows: processedData.length,
    currentPage,
    totalPages,
    pageSize,
    isLoading,
    headers: selectedDataset?.headers || [],
    availableDatasets: datasets.map(d => ({ name: d.name, year: d.year, rows: d.totalRows })),
    
    // Actions
    setCurrentPage,
    setPageSize,
    setFilters,
    setSortConfig,
    sortConfig
  };
}
