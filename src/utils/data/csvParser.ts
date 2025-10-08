/**
 * CSV Data Parser for Rwanda Health Analytics
 * Frontend-only solution for processing health survey datasets
 */

export interface CsvRow {
  [key: string]: string | number | boolean | null;
}

export interface ParsedDataset {
  name: string;
  year: string;
  headers: string[];
  data: CsvRow[];
  totalRows: number;
  lastUpdated: string;
}

export interface DataSummary {
  totalDatasets: number;
  totalRecords: number;
  availableYears: string[];
  categories: {
    birth: number;
    child: number;
    household: number;
    woman: number;
    male: number;
    person: number;
    couples: number;
  };
}

/**
 * Parse CSV text content into structured data
 */
export function parseCSV(csvText: string, filename: string): ParsedDataset {
  const lines = csvText.trim().split('\n');
  
  if (lines.length === 0) {
    throw new Error('Empty CSV file');
  }

  // Parse headers
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  // Parse data rows
  const data: CsvRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length === headers.length) {
      const row: CsvRow = {};
      headers.forEach((header, index) => {
        const value = values[index];
        // Try to convert to appropriate type
        row[header] = convertValue(value);
      });
      data.push(row);
    }
  }

  // Extract year from filename
  const yearMatch = filename.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : 'unknown';

  return {
    name: filename.replace('.csv', ''),
    year,
    headers,
    data,
    totalRows: data.length,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Convert string value to appropriate type
 */
function convertValue(value: string): string | number | boolean | null {
  const trimmed = value.trim().replace(/"/g, '');
  
  if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed === 'NA') {
    return null;
  }
  
  if (trimmed.toLowerCase() === 'true') return true;
  if (trimmed.toLowerCase() === 'false') return false;
  
  // Try to convert to number
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') {
    return num;
  }
  
  return trimmed;
}

/**
 * Fetch and parse CSV from public data folder
 */
export async function fetchAndParseCSV(datasetPath: string, filename: string): Promise<ParsedDataset> {
  try {
    const response = await fetch(`/data/${datasetPath}/${filename}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSV(csvText, filename);
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    throw error;
  }
}

/**
 * Load all available datasets
 */
export async function loadAllDatasets(): Promise<ParsedDataset[]> {
  const datasets: ParsedDataset[] = [];
  
  const dataPaths = [
    { path: 'health-survey-2019-2020', files: ['Birth_2019-2020.csv', 'Child_2019-2020.csv', 'Household_2019-2020.csv', 'Woman_2019-2020.csv', 'Male_2019-2020.csv', 'Person_2019-2020.csv'] },
    { path: 'health-survey-2014-2015', files: ['Birth_2014-2015.csv', 'Child_2014-2015.csv', 'Household_2014-2015.csv', 'Woman_2014-2015.csv', 'Male_2014-2015.csv', 'Person_2014-2015.csv'] },
    { path: 'health-survey-2010', files: ['Birth_2010.csv', 'Child_2010.csv', 'Household_2010.csv', 'Woman_2010.csv', 'Male_2010.csv', 'Person_2010.csv'] }
  ];

  for (const dataPath of dataPaths) {
    for (const filename of dataPath.files) {
      try {
        const dataset = await fetchAndParseCSV(dataPath.path, filename);
        datasets.push(dataset);
      } catch (error) {
        console.warn(`Failed to load ${filename}:`, error);
      }
    }
  }

  return datasets;
}

/**
 * Generate data summary
 */
export function generateDataSummary(datasets: ParsedDataset[]): DataSummary {
  const totalRecords = datasets.reduce((sum, dataset) => sum + dataset.totalRows, 0);
  const years = [...new Set(datasets.map(d => d.year))].sort();
  
  const categories = {
    birth: datasets.filter(d => d.name.toLowerCase().includes('birth')).length,
    child: datasets.filter(d => d.name.toLowerCase().includes('child')).length,
    household: datasets.filter(d => d.name.toLowerCase().includes('household')).length,
    woman: datasets.filter(d => d.name.toLowerCase().includes('woman')).length,
    male: datasets.filter(d => d.name.toLowerCase().includes('male')).length,
    person: datasets.filter(d => d.name.toLowerCase().includes('person')).length,
    couples: datasets.filter(d => d.name.toLowerCase().includes('couples')).length,
  };

  return {
    totalDatasets: datasets.length,
    totalRecords,
    availableYears: years,
    categories
  };
}

/**
 * Filter dataset by criteria
 */
export function filterDataset(
  dataset: ParsedDataset, 
  filters: { [key: string]: any }
): CsvRow[] {
  return dataset.data.filter(row => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined || value === '') return true;
      
      const rowValue = row[key];
      
      if (typeof value === 'string') {
        return String(rowValue).toLowerCase().includes(value.toLowerCase());
      }
      
      if (typeof value === 'number') {
        return Number(rowValue) === value;
      }
      
      return rowValue === value;
    });
  });
}

/**
 * Sort dataset by column
 */
export function sortDataset(
  data: CsvRow[], 
  column: string, 
  direction: 'asc' | 'desc' = 'asc'
): CsvRow[] {
  return [...data].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    
    return direction === 'asc' 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
}

/**
 * Export filtered data as CSV
 */
export function exportToCSV(data: CsvRow[], filename: string): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        const strValue = value === null ? '' : String(value);
        return strValue.includes(',') ? `"${strValue}"` : strValue;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
