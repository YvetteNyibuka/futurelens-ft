/**
 * Health Indicators Data Processor
 * Converts raw CSV data into structured health insights
 */

import { CsvRow, ParsedDataset } from './csvParser';
import { HealthIndicator, Demographics, Vaccination, Location, Timeframe } from '../../types/health';

export interface ProcessedHealthData {
  demographics: Demographics[];
  healthIndicators: HealthIndicator[];
  vaccinations: Vaccination[];
  summaryStats: {
    totalRecords: number;
    yearsSpanned: string[];
    coverageMetrics: {
      births: number;
      children: number;
      households: number;
      women: number;
      men: number;
    };
  };
}

/**
 * Process all datasets into structured health data
 */
export function processHealthData(datasets: ParsedDataset[]): ProcessedHealthData {
  const demographics: Demographics[] = [];
  const healthIndicators: HealthIndicator[] = [];
  const vaccinations: Vaccination[] = [];

  for (const dataset of datasets) {
    try {
      if (dataset.name.includes('Birth')) {
        const birthIndicators = processBirthData(dataset);
        healthIndicators.push(...birthIndicators);
      }
      
      if (dataset.name.includes('Child')) {
        const childData = processChildData(dataset);
        healthIndicators.push(...childData.indicators);
        vaccinations.push(...childData.vaccinations);
      }
      
      if (dataset.name.includes('Household')) {
        const householdDemographics = processHouseholdData(dataset);
        demographics.push(...householdDemographics);
      }
      
      if (dataset.name.includes('Woman')) {
        const womenIndicators = processWomenData(dataset);
        healthIndicators.push(...womenIndicators);
      }
    } catch (error) {
      console.warn(`Error processing ${dataset.name}:`, error);
    }
  }

  const summaryStats = generateSummaryStats(datasets);

  return {
    demographics,
    healthIndicators,
    vaccinations,
    summaryStats
  };
}

/**
 * Process birth data into health indicators
 */
function processBirthData(dataset: ParsedDataset): HealthIndicator[] {
  const indicators: HealthIndicator[] = [];
  const birthData = dataset.data;

  // Sample birth indicators - adapt based on actual CSV structure
  if (birthData.length > 0) {
    const sampleRow = birthData[0];
    
    // Birth weight analysis
    const lowBirthWeightCount = birthData.filter(row => 
      row.birth_weight && Number(row.birth_weight) < 2500
    ).length;
    
    if (lowBirthWeightCount > 0) {
      indicators.push({
        _id: `birth_weight_${dataset.year}`,
        indicatorName: 'Low Birth Weight Rate',
        category: 'child_health',
        value: (lowBirthWeightCount / birthData.length) * 100,
        unit: 'percentage',
        location: { level: 'national' },
        timeframe: { year: parseInt(dataset.year) },
        source: `DHS ${dataset.year}`,
        trend: 'unknown',
        dataQuality: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Skilled birth attendance
    const skilledAttendanceCount = birthData.filter(row => 
      row.delivery_assistance && 
      ['doctor', 'nurse', 'midwife'].some(skill => 
        String(row.delivery_assistance).toLowerCase().includes(skill)
      )
    ).length;

    if (skilledAttendanceCount > 0) {
      indicators.push({
        _id: `skilled_birth_${dataset.year}`,
        indicatorName: 'Skilled Birth Attendance',
        category: 'maternal_health',
        value: (skilledAttendanceCount / birthData.length) * 100,
        unit: 'percentage',
        location: { level: 'national' },
        timeframe: { year: parseInt(dataset.year) },
        source: `DHS ${dataset.year}`,
        trend: 'improving',
        dataQuality: 'high',
        targetValue: 90,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  return indicators;
}

/**
 * Process child data into health indicators and vaccination data
 */
function processChildData(dataset: ParsedDataset): { indicators: HealthIndicator[], vaccinations: Vaccination[] } {
  const indicators: HealthIndicator[] = [];
  const vaccinations: Vaccination[] = [];
  const childData = dataset.data;

  if (childData.length > 0) {
    // Vaccination coverage analysis
    const vaccinationFields = ['bcg', 'dpt1', 'dpt2', 'dpt3', 'polio1', 'polio2', 'polio3', 'measles'];
    
    vaccinationFields.forEach(vaccine => {
      const vaccinatedCount = childData.filter(row => 
        row[vaccine] && (row[vaccine] === 1 || row[vaccine] === 'yes')
      ).length;

      if (vaccinatedCount > 0) {
        const coverage = (vaccinatedCount / childData.length) * 100;
        
        vaccinations.push({
          _id: `${vaccine}_${dataset.year}`,
          vaccineName: vaccine.toUpperCase(),
          vaccineCode: vaccine,
          ageGroup: 'under-5',
          targetPopulation: childData.length,
          vaccinatedCount,
          coveragePercentage: coverage,
          location: { level: 'national' },
          timeframe: { year: parseInt(dataset.year) },
          vaccineType: 'routine',
          administrationMethod: vaccine === 'polio1' || vaccine === 'polio2' || vaccine === 'polio3' ? 'oral' : 'injection',
          source: `DHS ${dataset.year}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        indicators.push({
          _id: `vaccination_${vaccine}_${dataset.year}`,
          indicatorName: `${vaccine.toUpperCase()} Vaccination Coverage`,
          category: 'infectious_diseases',
          value: coverage,
          unit: 'percentage',
          location: { level: 'national' },
          timeframe: { year: parseInt(dataset.year) },
          source: `DHS ${dataset.year}`,
          trend: coverage > 80 ? 'improving' : 'stable',
          dataQuality: 'high',
          targetValue: 95,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });

    // Child mortality indicators
    const deathsCount = childData.filter(row => 
      row.child_died && (row.child_died === 1 || row.child_died === 'yes')
    ).length;

    if (deathsCount >= 0) {
      const mortalityRate = (deathsCount / childData.length) * 1000; // per 1000 births
      
      indicators.push({
        _id: `child_mortality_${dataset.year}`,
        indicatorName: 'Under-5 Mortality Rate',
        category: 'child_health',
        value: mortalityRate,
        unit: 'per 1000 live births',
        location: { level: 'national' },
        timeframe: { year: parseInt(dataset.year) },
        source: `DHS ${dataset.year}`,
        trend: mortalityRate < 50 ? 'improving' : 'stable',
        dataQuality: 'high',
        targetValue: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  return { indicators, vaccinations };
}

/**
 * Process household data into demographics
 */
function processHouseholdData(dataset: ParsedDataset): Demographics[] {
  const demographics: Demographics[] = [];
  const householdData = dataset.data;

  if (householdData.length > 0) {
    // Aggregate household-level data
    const totalPopulation = householdData.reduce((sum, row) => 
      sum + (Number(row.household_size) || 0), 0
    );

    const totalMale = householdData.reduce((sum, row) => 
      sum + (Number(row.male_members) || 0), 0
    );

    const totalFemale = householdData.reduce((sum, row) => 
      sum + (Number(row.female_members) || 0), 0
    );

    const urbanHouseholds = householdData.filter(row => 
      String(row.residence_type).toLowerCase().includes('urban')
    ).length;

    const ruralHouseholds = householdData.length - urbanHouseholds;

    const waterAccess = householdData.filter(row => 
      row.water_source && !String(row.water_source).toLowerCase().includes('unprotected')
    ).length;

    const sanitationAccess = householdData.filter(row => 
      row.toilet_facility && !String(row.toilet_facility).toLowerCase().includes('none')
    ).length;

    demographics.push({
      _id: `demographics_${dataset.year}`,
      location: { level: 'national' },
      population: {
        total: totalPopulation,
        male: totalMale,
        female: totalFemale,
        ageDistribution: [], // Would need more detailed age data
        urbanRural: {
          urban: (urbanHouseholds / householdData.length) * totalPopulation,
          rural: (ruralHouseholds / householdData.length) * totalPopulation
        }
      },
      healthMetrics: {
        lifeExpectancy: {
          overall: 65, // Placeholder - would calculate from data
          male: 63,
          female: 67
        },
        infantMortalityRate: 0, // Would calculate from birth data
        under5MortalityRate: 0, // Would calculate from child data
        maternalMortalityRate: 0, // Would calculate from maternal data
        birthRate: 0,
        deathRate: 0
      },
      socioEconomic: {
        literacyRate: 0, // Would calculate from education data
        unemploymentRate: 0,
        povertyRate: 0,
        accessToHealthcare: 0,
        accessToCleanWater: (waterAccess / householdData.length) * 100,
        accessToSanitation: (sanitationAccess / householdData.length) * 100
      },
      vulnerableGroups: {
        pregnant: 0,
        lactating: 0,
        under5: 0,
        elderly: 0,
        disabled: 0,
        refugees: 0
      },
      dataYear: parseInt(dataset.year),
      dataSource: `DHS ${dataset.year}`
    });
  }

  return demographics;
}

/**
 * Process women's data into health indicators
 */
function processWomenData(dataset: ParsedDataset): HealthIndicator[] {
  const indicators: HealthIndicator[] = [];
  const womenData = dataset.data;

  if (womenData.length > 0) {
    // Maternal health indicators
    const antenatalCareCount = womenData.filter(row => 
      row.antenatal_visits && Number(row.antenatal_visits) >= 4
    ).length;

    if (antenatalCareCount > 0) {
      indicators.push({
        _id: `antenatal_care_${dataset.year}`,
        indicatorName: 'Antenatal Care Coverage (4+ visits)',
        category: 'maternal_health',
        value: (antenatalCareCount / womenData.length) * 100,
        unit: 'percentage',
        location: { level: 'national' },
        timeframe: { year: parseInt(dataset.year) },
        source: `DHS ${dataset.year}`,
        trend: 'improving',
        dataQuality: 'high',
        targetValue: 95,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Contraceptive prevalence
    const contraceptiveUsers = womenData.filter(row => 
      row.contraceptive_use && (row.contraceptive_use === 1 || row.contraceptive_use === 'yes')
    ).length;

    if (contraceptiveUsers > 0) {
      indicators.push({
        _id: `contraceptive_prevalence_${dataset.year}`,
        indicatorName: 'Contraceptive Prevalence Rate',
        category: 'reproductive_health',
        value: (contraceptiveUsers / womenData.length) * 100,
        unit: 'percentage',
        location: { level: 'national' },
        timeframe: { year: parseInt(dataset.year) },
        source: `DHS ${dataset.year}`,
        trend: 'improving',
        dataQuality: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  return indicators;
}

/**
 * Generate summary statistics
 */
function generateSummaryStats(datasets: ParsedDataset[]) {
  const totalRecords = datasets.reduce((sum, dataset) => sum + dataset.totalRows, 0);
  const yearsSpanned = [...new Set(datasets.map(d => d.year))].sort();
  
  const coverageMetrics = {
    births: datasets.filter(d => d.name.includes('Birth')).reduce((sum, d) => sum + d.totalRows, 0),
    children: datasets.filter(d => d.name.includes('Child')).reduce((sum, d) => sum + d.totalRows, 0),
    households: datasets.filter(d => d.name.includes('Household')).reduce((sum, d) => sum + d.totalRows, 0),
    women: datasets.filter(d => d.name.includes('Woman')).reduce((sum, d) => sum + d.totalRows, 0),
    men: datasets.filter(d => d.name.includes('Male')).reduce((sum, d) => sum + d.totalRows, 0)
  };

  return {
    totalRecords,
    yearsSpanned,
    coverageMetrics
  };
}

/**
 * Calculate trends between years
 */
export function calculateTrends(indicators: HealthIndicator[]): any[] {
  const grouped = indicators.reduce((acc, indicator) => {
    const key = indicator.indicatorName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(indicator);
    return acc;
  }, {} as { [key: string]: HealthIndicator[] });

  return Object.entries(grouped).map(([name, data]) => {
    const sorted = data.sort((a, b) => a.timeframe.year - b.timeframe.year);
    const startValue = sorted[0]?.value || 0;
    const endValue = sorted[sorted.length - 1]?.value || 0;
    const change = endValue - startValue;
    const percentChange = startValue ? (change / startValue) * 100 : 0;

    return {
      indicator: name,
      dataPoints: sorted.map(d => ({ year: d.timeframe.year, value: d.value })),
      startValue,
      endValue,
      absoluteChange: change,
      percentChange,
      trend: change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable',
      category: sorted[0]?.category || 'unknown'
    };
  });
}
