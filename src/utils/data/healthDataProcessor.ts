/**
 * Data Processing Pipeline for NSIR Health Datasets
 * Converts CSV data into structured, queryable JSON format
 */

import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export interface DatasetMetadata {
  name: string;
  year: string;
  source: string;
  category:
    | "women"
    | "men"
    | "child"
    | "household"
    | "birth"
    | "couples"
    | "worker"
    | "person"
    | "calendar"
    | "maternal";
  recordCount: number;
  processedAt: string;
  version: string;
}

export interface ProcessedDataRecord {
  id: string;
  surveyYear: number;
  category: string;
  data: Record<string, any>;
  metadata: {
    originalFile: string;
    processedAt: string;
  };
}

export interface AggregatedMetrics {
  totalRecords: number;
  yearRange: {
    start: number;
    end: number;
  };
  categories: string[];
  provinces: string[];
  keyIndicators: {
    [key: string]: {
      total: number;
      average: number;
      trend: "increasing" | "decreasing" | "stable";
      yearlyData: Array<{
        year: number;
        value: number;
      }>;
    };
  };
}

export class HealthDataProcessor {
  private dataPath: string;
  private processedDataCache: Map<string, ProcessedDataRecord[]> = new Map();

  constructor(dataPath: string = "/public/data") {
    this.dataPath = dataPath;
  }

  /**
   * Get all available datasets from the file system
   */
  async getAvailableDatasets(): Promise<DatasetMetadata[]> {
    const datasets: DatasetMetadata[] = [];
    const basePath = path.join(process.cwd(), this.dataPath);

    try {
      const folders = fs
        .readdirSync(basePath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .filter((name) => name.includes("Survey") || name.includes("Enquete"));

      for (const folder of folders) {
        const folderPath = path.join(basePath, folder);
        const csvFiles = fs
          .readdirSync(folderPath)
          .filter((file) => file.endsWith(".csv"));

        for (const csvFile of csvFiles) {
          const filePath = path.join(folderPath, csvFile);
          const stats = fs.statSync(filePath);

          // Extract year from folder name
          const yearMatch = folder.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : "unknown";

          // Extract category from filename
          const category = this.extractCategory(csvFile);

          datasets.push({
            name: `${category}_${year}`,
            year,
            source: folder,
            category,
            recordCount: 0, // Will be calculated during processing
            processedAt: stats.mtime.toISOString(),
            version: "1.0",
          });
        }
      }
    } catch (error) {
      console.error("Error reading datasets:", error);
    }

    return datasets;
  }

  /**
   * Process a single CSV file into structured format
   */
  async processCSVFile(
    filePath: string,
    metadata: DatasetMetadata
  ): Promise<ProcessedDataRecord[]> {
    try {
      console.log(`Processing: ${filePath}`);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Parse CSV with headers
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        delimiter: ",",
        quote: '"',
        escape: '"',
      });

      const processedRecords: ProcessedDataRecord[] = records.map(
        (record: any, index: number) => ({
          id: `${metadata.name}_${index}`,
          surveyYear: parseInt(metadata.year),
          category: metadata.category,
          data: this.cleanAndNormalizeRecord(record, metadata.category),
          metadata: {
            originalFile: filePath,
            processedAt: new Date().toISOString(),
          },
        })
      );

      // Update metadata with actual record count
      metadata.recordCount = processedRecords.length;

      console.log(
        `Processed ${processedRecords.length} records from ${path.basename(
          filePath
        )}`
      );
      return processedRecords;
    } catch (error) {
      console.error(`Error processing CSV file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Clean and normalize individual record based on category
   */
  private cleanAndNormalizeRecord(
    record: any,
    category: string
  ): Record<string, any> {
    const cleaned: Record<string, any> = {};

    // Common cleaning for all categories
    for (const [key, value] of Object.entries(record)) {
      if (value === "" || value === null || value === undefined) {
        cleaned[key] = null;
      } else if (typeof value === "string") {
        // Try to convert to number if it looks like one
        const numValue = parseFloat(value as string);
        if (!isNaN(numValue) && isFinite(numValue)) {
          cleaned[key] = numValue;
        } else {
          cleaned[key] = (value as string).trim();
        }
      } else {
        cleaned[key] = value;
      }
    }

    // Category-specific processing
    switch (category) {
      case "women":
        return this.processWomenData(cleaned);
      case "men":
        return this.processMenData(cleaned);
      case "child":
        return this.processChildData(cleaned);
      case "household":
        return this.processHouseholdData(cleaned);
      case "birth":
        return this.processBirthData(cleaned);
      default:
        return cleaned;
    }
  }

  /**
   * Process women-specific data with health indicators
   */
  private processWomenData(record: any): any {
    return {
      ...record,
      // Standardized fields
      caseId: record.caseid || record.v001,
      clusterId: record.v001,
      householdNumber: record.v002,
      lineNumber: record.v003,
      weight: record.v005,
      interviewDate: this.parseDate(record.v006, record.v007),

      // Health indicators
      pregnancyHistory: this.extractPregnancyData(record),
      contraceptiveUse: this.extractContraceptiveData(record),
      healthCare: this.extractHealthCareData(record),
      nutrition: this.extractNutritionData(record),

      // Socioeconomic
      education: record.v106 || record.v149,
      wealthIndex: record.v190,
      employment: record.v717,

      // Geographic
      region: record.v024,
      residence: record.v025, // 1=urban, 2=rural
    };
  }

  /**
   * Process household data with living conditions
   */
  private processHouseholdData(record: any): any {
    return {
      ...record,
      householdId: record.hhid || record.hv001,
      clusterId: record.hv001,
      householdNumber: record.hv002,
      weight: record.hv005,

      // Housing characteristics
      waterSource: record.hv201,
      toiletType: record.hv205,
      floorType: record.hv213,
      electricity: record.hv206,

      // Assets
      radio: record.hv207,
      television: record.hv208,
      refrigerator: record.hv209,
      bicycle: record.hv210,
      motorcycle: record.hv211,
      car: record.hv212,

      // Demographics
      householdSize: record.hv009,
      children: record.hv014,

      // Geographic
      region: record.hv024,
      residence: record.hv025,
    };
  }

  /**
   * Process child data with health and nutrition indicators
   */
  private processChildData(record: any): any {
    return {
      ...record,
      caseId: record.caseid,
      childId: record.bidx || record.hw1,
      mothersLine: record.v003,

      // Demographics
      age: record.hw1,
      sex: record.b4,
      birthOrder: record.bord,

      // Health measurements
      height: record.hw3,
      weight: record.hw2,
      stunting: record.hw70, // Height-for-age z-score
      wasting: record.hw72, // Weight-for-height z-score
      underweight: record.hw71, // Weight-for-age z-score

      // Vaccinations
      vaccinations: this.extractVaccinationData(record),

      // Health conditions
      fever: record.h22,
      cough: record.h31,
      diarrhea: record.h11,

      // Care seeking
      healthFacilityVisit: record.h32,
      treatment: record.h12,
    };
  }

  // Additional helper methods for data extraction
  private extractPregnancyData(record: any) {
    return {
      totalPregnancies: record.v201,
      livingChildren: record.v218,
      birthsLast5Years: record.v208,
      lastBirthDate: record.v011,
      antenatalCare: record.m14,
      skilledDelivery: record.m15,
      postnatalCare: record.m62,
    };
  }

  private extractContraceptiveData(record: any) {
    return {
      currentUse: record.v312,
      currentMethod: record.v313,
      knowledgeModern: record.v301,
      everUsed: record.v302,
    };
  }

  private extractHealthCareData(record: any) {
    return {
      healthInsurance: record.v481,
      problemAccessingCare: {
        permission: record.v467a,
        money: record.v467b,
        distance: record.v467c,
        transport: record.v467d,
      },
    };
  }

  private extractNutritionData(record: any) {
    return {
      bmi: record.v445,
      anemia: record.v456,
      vitaminA: record.v414,
      ironTablets: record.v408,
    };
  }

  private extractVaccinationData(record: any) {
    return {
      bcg: record.h2,
      dpt1: record.h3,
      dpt2: record.h5,
      dpt3: record.h7,
      polio1: record.h4,
      polio2: record.h6,
      polio3: record.h8,
      measles: record.h9,
      allBasic: record.h10,
    };
  }

  private processMenData(record: any): any {
    return {
      ...record,
      caseId: record.mcaseid || record.mv001,
      // Add men-specific processing
    };
  }

  private processBirthData(record: any): any {
    return {
      ...record,
      caseId: record.caseid,
      // Add birth-specific processing
    };
  }

  /**
   * Extract category from filename
   */
  private extractCategory(filename: string): DatasetMetadata["category"] {
    const lower = filename.toLowerCase();
    if (lower.includes("women")) return "women";
    if (lower.includes("men")) return "men";
    if (lower.includes("child")) return "child";
    if (lower.includes("household")) return "household";
    if (lower.includes("birth")) return "birth";
    if (lower.includes("couple")) return "couples";
    if (lower.includes("worker")) return "worker";
    if (lower.includes("person")) return "person";
    if (lower.includes("calendar")) return "calendar";
    if (lower.includes("maternal")) return "maternal";
    return "household"; // default
  }

  /**
   * Parse interview date from DHS format
   */
  private parseDate(month?: any, year?: any): string | null {
    if (!month || !year) return null;
    try {
      const m = parseInt(month);
      const y = parseInt(year);
      if (y < 50) return `${2000 + y}-${String(m).padStart(2, "0")}-01`;
      if (y < 100) return `${1900 + y}-${String(m).padStart(2, "0")}-01`;
      return `${y}-${String(m).padStart(2, "0")}-01`;
    } catch {
      return null;
    }
  }

  /**
   * Generate aggregated metrics across all datasets
   */
  async generateAggregatedMetrics(
    processedData: ProcessedDataRecord[]
  ): Promise<AggregatedMetrics> {
    const metrics: AggregatedMetrics = {
      totalRecords: processedData.length,
      yearRange: {
        start: Math.min(...processedData.map((r) => r.surveyYear)),
        end: Math.max(...processedData.map((r) => r.surveyYear)),
      },
      categories: [...new Set(processedData.map((r) => r.category))],
      provinces: [
        ...new Set(
          processedData
            .map((r) => r.data.region)
            .filter(Boolean)
            .map(String)
        ),
      ],
      keyIndicators: {},
    };

    // Calculate key health indicators
    await this.calculateHealthIndicators(processedData, metrics);

    return metrics;
  }

  private async calculateHealthIndicators(
    data: ProcessedDataRecord[],
    metrics: AggregatedMetrics
  ) {
    // Child mortality trends
    const childData = data.filter((r) => r.category === "child");
    if (childData.length > 0) {
      metrics.keyIndicators.childMortality = this.calculateIndicatorTrend(
        childData,
        "data.age",
        (record) => record.data.age <= 5
      );
    }

    // Vaccination coverage
    const womenData = data.filter((r) => r.category === "women");
    if (womenData.length > 0) {
      metrics.keyIndicators.vaccinationCoverage = this.calculateIndicatorTrend(
        womenData,
        "data.pregnancyHistory.antenatalCare"
      );
    }

    // Stunting rates
    metrics.keyIndicators.stuntingRate = this.calculateIndicatorTrend(
      childData,
      "data.stunting",
      (record) => record.data.stunting < -2 // Below -2 z-score
    );
  }

  private calculateIndicatorTrend(
    data: ProcessedDataRecord[],
    field: string,
    filter?: (record: ProcessedDataRecord) => boolean
  ) {
    const relevantData = filter ? data.filter(filter) : data;
    const yearlyData = relevantData.reduce((acc, record) => {
      const year = record.surveyYear;
      if (!acc[year]) acc[year] = [];
      acc[year].push(record);
      return acc;
    }, {} as Record<number, ProcessedDataRecord[]>);

    const yearlyValues = Object.entries(yearlyData)
      .map(([year, records]) => ({
        year: parseInt(year),
        value: records.length,
      }))
      .sort((a, b) => a.year - b.year);

    const total = relevantData.length;
    const average = total / Object.keys(yearlyData).length;

    // Calculate trend
    let trend: "increasing" | "decreasing" | "stable" = "stable";
    if (yearlyValues.length > 1) {
      const firstHalf = yearlyValues.slice(
        0,
        Math.ceil(yearlyValues.length / 2)
      );
      const secondHalf = yearlyValues.slice(
        Math.floor(yearlyValues.length / 2)
      );
      const firstAvg =
        firstHalf.reduce((sum, d) => sum + d.value, 0) / firstHalf.length;
      const secondAvg =
        secondHalf.reduce((sum, d) => sum + d.value, 0) / secondHalf.length;

      if (secondAvg > firstAvg * 1.1) trend = "increasing";
      else if (secondAvg < firstAvg * 0.9) trend = "decreasing";
    }

    return {
      total,
      average,
      trend,
      yearlyData: yearlyValues,
    };
  }
}

export default HealthDataProcessor;
