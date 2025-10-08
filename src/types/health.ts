// Core Types for Rwanda Health Analytics Platform

export interface Location {
  level: "national" | "provincial" | "district" | "sector" | "cell";
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
}

export interface Timeframe {
  year: number;
  quarter?: number;
  month?: number;
}

export interface HealthIndicator {
  _id: string;
  indicatorName: string;
  category:
    | "maternal_health"
    | "child_health"
    | "infectious_diseases"
    | "non_communicable_diseases"
    | "nutrition"
    | "mental_health"
    | "reproductive_health";
  value: number;
  unit: string;
  location: Location;
  timeframe: Timeframe;
  source: string;
  methodology?: string;
  targetValue?: number;
  trend: "improving" | "declining" | "stable" | "unknown";
  dataQuality: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
}

export interface Demographics {
  _id: string;
  location: Location;
  population: {
    total: number;
    male: number;
    female: number;
    ageDistribution: {
      ageGroup: string;
      male: number;
      female: number;
      total: number;
    }[];
    urbanRural: {
      urban: number;
      rural: number;
    };
  };
  healthMetrics: {
    lifeExpectancy: {
      overall: number;
      male: number;
      female: number;
    };
    infantMortalityRate: number;
    under5MortalityRate: number;
    maternalMortalityRate: number;
    birthRate: number;
    deathRate: number;
  };
  socioEconomic: {
    literacyRate: number;
    unemploymentRate: number;
    povertyRate: number;
    accessToHealthcare: number;
    accessToCleanWater: number;
    accessToSanitation: number;
  };
  vulnerableGroups: {
    pregnant: number;
    lactating: number;
    under5: number;
    elderly: number;
    disabled: number;
    refugees: number;
  };
  dataYear: number;
  dataSource: string;
}

export interface Vaccination {
  _id: string;
  vaccineName: string;
  vaccineCode: string;
  ageGroup: string;
  targetPopulation: number;
  vaccinatedCount: number;
  coveragePercentage: number;
  location: Location;
  timeframe: Timeframe;
  vaccineType: "routine" | "supplementary" | "outbreak_response";
  administrationMethod: "oral" | "injection" | "nasal";
  healthFacility?: string;
  batchNumber?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface TrendAnalysis {
  success: boolean;
  indicator: string;
  timespan: string;
  dataPoints: number;
  trends: {
    year: number;
    value: number;
    yearChange: number;
    location: Location;
  }[];
  summary: {
    startValue: number;
    endValue: number;
    overallChange: number;
    averageAnnualChange: number;
  };
}

export interface HealthScore {
  success: boolean;
  location: string;
  score: number;
  maxScore: number;
  indicatorsUsed: number;
  breakdown: {
    indicator: string;
    value: number;
    year: number;
  }[];
}

export interface GeographicalInsights {
  success: boolean;
  totalProvinces: number;
  insights: {
    province: string;
    healthScore: number;
    population: number;
    keyIndicators: number;
    trends: {
      improving: number;
      concernsLevel: number;
    };
  }[];
  nationalAverage: {
    healthScore: number;
    population: number;
  };
}

export interface EarlyWarningAlert {
  success: boolean;
  alertsGenerated: number;
  timestamp: string;
  alerts: {
    type: "warning" | "concern";
    indicator: string;
    location: Location;
    change: number;
    message: string;
    priority: "high" | "medium" | "low";
  }[];
}

// 28-Year Transformation Story Types
export interface TransformationStory {
  title: string;
  period: string;
  executiveSummary: string[];
  keyFindings: {
    transformationalAchievements: string[];
    healthOutcomeImprovements: string[];
    systemStrengtheningWins: string[];
  };
  developmentStory: {
    preGenocideBaseline: string[];
    postGenocideReconstruction: string[];
    millenniumDevelopmentGoals: string[];
    vision2020Implementation: string[];
    sustainableDevelopmentGoals: string[];
  };
  policyImpacts: {
    policy: string;
    year: number;
    impact: string;
  }[];
  provinceSpotlights: {
    province: string;
    achievement: string;
    story: string;
  }[];
  recommendations: string[];
}

export interface MultiYearTrendResult {
  indicator: string;
  category: string;
  dataPoints: {
    year: number;
    value: number;
    location: Location;
  }[];
  trendAnalysis: {
    overallTrend: "improving" | "declining" | "stable";
    totalChange: number;
    averageAnnualChange: number;
    significantMilestones: {
      year: number;
      value: number;
      significance: string;
    }[];
  };
  regionalVariations: {
    province: string;
    trend: "improving" | "declining" | "stable";
    change: number;
  }[];
}

export interface Comprehensive28YearAnalysis {
  transformationStory: TransformationStory;
  trendAnalysis: {
    vaccination: MultiYearTrendResult[];
    maternalHealth: MultiYearTrendResult[];
  };
  phaseAnalysis: {
    phases: {
      name: string;
      period: string;
      keyFocus: string[];
      majorAchievements: string[];
    }[];
  };
  benchmarkComparison: {
    regional: {
      indicator: string;
      rwanda: number;
      eastAfrica: number;
      ranking: string;
    }[];
    global: {
      indicator: string;
      rwanda: number;
      globalAverage: number;
      ranking: string;
    }[];
  };
  metadata: {
    analysisDate: string;
    dataYearsSpanned: number;
    totalIndicatorsAnalyzed: number;
    dataSources: string[];
  };
}
