"use client";

import React, { useState } from "react";
import { scaleLinear } from "d3-scale";

// Define the type for province health data
type ProvinceHealthData = {
  name: string;
  id: string;
  population: number;
  health_facilities: number;
  coverage_rate: number;
  urbanization: number;
  // Can be expanded with more health metrics
};

type Province = {
  id: string;
  name: string;
  path: string;
  center: [number, number]; // [x, y] coordinates for labels/markers
  defaultValues: {
    coverage_rate: number;
    childMortality: number;
    vaccination: number;
  };
};

// Simplified path data for Rwanda provinces
const rwandaProvinces: Province[] = [
  {
    id: "kigali",
    name: "Kigali",
    path: "M120,100 L140,100 L140,120 L120,120 Z",
    center: [130, 110],
    defaultValues: {
      coverage_rate: 94.2,
      childMortality: 32.1,
      vaccination: 97.0,
    },
  },
  {
    id: "eastern",
    name: "Eastern",
    path: "M140,80 L180,80 L180,130 L140,130 Z",
    center: [160, 105],
    defaultValues: {
      coverage_rate: 87.8,
      childMortality: 38.5,
      vaccination: 92.3,
    },
  },
  {
    id: "northern",
    name: "Northern",
    path: "M90,60 L140,60 L140,100 L90,100 Z",
    center: [115, 80],
    defaultValues: {
      coverage_rate: 85.4,
      childMortality: 42.6,
      vaccination: 90.1,
    },
  },
  {
    id: "western",
    name: "Western",
    path: "M60,80 L90,80 L90,150 L60,150 Z",
    center: [75, 115],
    defaultValues: {
      coverage_rate: 82.1,
      childMortality: 45.8,
      vaccination: 88.4,
    },
  },
  {
    id: "southern",
    name: "Southern",
    path: "M90,120 L140,120 L140,150 L90,150 Z",
    center: [115, 135],
    defaultValues: {
      coverage_rate: 78.9,
      childMortality: 49.2,
      vaccination: 85.7,
    },
  },
];

type RwandaHealthMapProps = {
  provinceData?: Record<string, any>;
  onProvinceClick?: (province: string) => void;
  selectedIndicator?: string;
};

export const RwandaHealthMap: React.FC<RwandaHealthMapProps> = ({
  provinceData = {},
  onProvinceClick,
  selectedIndicator = "coverage_rate",
}) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Create color scale for the selected indicator
  const colorScale = scaleLinear<string>()
    .domain([70, 80, 90, 100])
    .range(["#4a69bd", "#3867d6", "#1e56a0", "#0c2461"]);

  // Create inverse color scale for child mortality (lower is better)
  const mortalityColorScale = scaleLinear<string>()
    .domain([25, 35, 45, 55])
    .range(["#0c2461", "#1e56a0", "#3867d6", "#4a69bd"]);

  // Get the value for the selected indicator
  const getIndicatorValue = (province: Province) => {
    const provinceName = province.name;

    // Use data from props if available, otherwise fallback to default values
    if (provinceData && provinceData[provinceName]) {
      const latestData =
        provinceData[provinceName][provinceData[provinceName].length - 1];
      if (selectedIndicator === "childMortality") {
        return (
          latestData.childMortality || province.defaultValues.childMortality
        );
      } else if (selectedIndicator === "vaccination") {
        return (
          latestData.vaccination?.dpt3 || province.defaultValues.vaccination
        );
      } else {
        return (
          latestData.maternalHealth?.skilledDelivery ||
          province.defaultValues.coverage_rate
        );
      }
    }

    // Fallback to default values
    if (selectedIndicator === "childMortality") {
      return province.defaultValues.childMortality;
    } else if (selectedIndicator === "vaccination") {
      return province.defaultValues.vaccination;
    }
    return province.defaultValues.coverage_rate;
  };

  // Get fill color based on the value
  const getFillColor = (province: Province) => {
    const value = getIndicatorValue(province);
    if (selectedIndicator === "childMortality") {
      return mortalityColorScale(value);
    }
    return colorScale(value);
  };

  const handleMouseEnter = (e: React.MouseEvent, province: Province) => {
    const value = getIndicatorValue(province);
    const indicator =
      selectedIndicator === "coverage_rate"
        ? "Health Coverage"
        : selectedIndicator === "childMortality"
        ? "Child Mortality"
        : "Vaccination Rate";

    setTooltipContent(
      `${province.name}: ${value.toFixed(1)}${
        selectedIndicator === "childMortality" ? " per 1,000" : "%"
      } ${indicator}`
    );

    setTooltipPosition({
      x: e.clientX,
      y: e.clientY,
    });

    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleProvinceClick = (provinceName: string) => {
    setSelectedProvince(provinceName);
    if (onProvinceClick) {
      onProvinceClick(provinceName);
    }
  };

  return (
    <div className="relative w-full h-full">
      {showTooltip && (
        <div
          className="absolute z-10 bg-white px-2 py-1 text-black rounded shadow text-sm pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 30,
          }}
        >
          {tooltipContent}
        </div>
      )}

      <svg
        viewBox="50 50 150 120"
        width="100%"
        height="100%"
        className="border border-gray-100 rounded-lg"
      >
        {/* Background */}
        <rect x="50" y="50" width="150" height="120" fill="#f1f9fe" />

        {/* Provinces */}
        {rwandaProvinces.map((province) => (
          <g key={province.id}>
            <path
              d={province.path}
              fill={getFillColor(province)}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              opacity={selectedProvince === province.name ? 1 : 0.85}
              strokeOpacity="0.8"
              onMouseEnter={(e) => handleMouseEnter(e, province)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleProvinceClick(province.name)}
              className="cursor-pointer transition-all duration-200 hover:opacity-100 hover:stroke-blue-900"
            />
            <text
              x={province.center[0]}
              y={province.center[1]}
              textAnchor="middle"
              fontSize="6"
              fill="#FFFFFF"
              className="pointer-events-none"
            >
              {province.name}
            </text>
          </g>
        ))}

        {/* Lake Kivu */}
        <ellipse
          cx="58"
          cy="115"
          rx="5"
          ry="15"
          fill="#aed9e6"
          stroke="#87c7e0"
          strokeWidth="0.5"
        />

        {/* Neighboring countries text */}
        <text x="50" y="60" fontSize="4" fill="#666">
          Uganda
        </text>
        <text x="185" y="90" fontSize="4" fill="#666">
          Tanzania
        </text>
        <text x="50" y="160" fontSize="4" fill="#666">
          DRC
        </text>
        <text x="140" y="165" fontSize="4" fill="#666">
          Burundi
        </text>
      </svg>

      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow text-xs">
        <div className="flex items-center mb-1">
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: "#4a69bd" }}
          ></div>
          <span>
            {selectedIndicator === "childMortality"
              ? "45-55 per 1,000"
              : "70-80%"}
          </span>
        </div>
        <div className="flex items-center mb-1">
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: "#3867d6" }}
          ></div>
          <span>
            {selectedIndicator === "childMortality"
              ? "35-45 per 1,000"
              : "80-90%"}
          </span>
        </div>
        <div className="flex items-center">
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: "#0c2461" }}
          ></div>
          <span>
            {selectedIndicator === "childMortality"
              ? "25-35 per 1,000"
              : "90-100%"}
          </span>
        </div>
      </div>
    </div>
  );
};
