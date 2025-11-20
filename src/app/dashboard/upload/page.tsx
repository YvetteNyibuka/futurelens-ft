"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { HealthDataService } from "../../../services/healthDataService";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
} from "lucide-react";

interface UploadRequirements {
  fileFormat: string;
  validNamingFormats: Array<{
    format: string;
    examples: string[];
    description: string;
  }>;
  validDatasetTypes: string[];
  validYears: string[];
  abbreviations: Record<string, string>;
  duplicateHandling: {
    detection: string;
    resolution: string;
    warning: string;
  };
  validation: {
    yearFormat: string;
    yearNormalization: string;
    pathDetection: string;
  };
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  type?: string;
  year?: string;
}

export default function EnhancedUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [showOverwriteConfirm, setShowOverwriteConfirm] = useState(false);
  const [conflictData, setConflictData] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch upload requirements
  const { data: requirements } = useQuery<{ requirements: UploadRequirements }>(
    {
      queryKey: ["uploadRequirements"],
      queryFn: () => HealthDataService.getUploadRequirements(),
    }
  );

  // Enhanced upload mutation with validation and conflict handling
  const uploadMutation = useMutation({
    mutationFn: ({ file, overwrite }: { file: File; overwrite?: boolean }) =>
      HealthDataService.uploadDataFileEnhanced(file, overwrite),
    onSuccess: (data: any) => {
      showToast(`✅ ${data.message}`, "success");
      setSelectedFile(null);
      setValidationResult(null);
      setShowOverwriteConfirm(false);
      setConflictData(null);
      queryClient.invalidateQueries({ queryKey: ["uploadStatus"] });
    },
    onError: (error: any) => {
      const errorData = error.response?.data;

      if (errorData?.conflict) {
        // Handle duplicate detection
        setConflictData(errorData);
        setShowOverwriteConfirm(true);
        showToast(
          `⚠️ Dataset already exists: ${errorData.conflict.datasetType} ${errorData.conflict.surveyYear}`,
          "error"
        );
      } else {
        showToast(`❌ ${errorData?.error || error.message}`, "error");
        if (errorData?.suggestion) {
          showToast(`💡 ${errorData.suggestion}`, "info");
        }
      }
    },
  });

  // Enhanced toast function with types
  const showToast = (message: string, type: "success" | "error" | "info") => {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : "bg-blue-500"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(
      () => {
        toast.style.opacity = "0";
        setTimeout(() => document.body.removeChild(toast), 300);
      },
      type === "info" ? 8000 : 5000
    );
  };

  // Client-side filename validation
  const validateFilename = (
    filename: string,
    relativePath?: string
  ): ValidationResult => {
    if (!requirements?.requirements) {
      return { isValid: true };
    }

    const reqs = requirements.requirements;
    const name = filename.toLowerCase();
    const path = relativePath?.toLowerCase() || "";

    // Check file extension
    if (!name.endsWith(".csv")) {
      return {
        isValid: false,
        error: "Invalid file format",
        suggestion: "Please upload a CSV file",
      };
    }

    // Pattern 1: datatype_year.csv
    const directPattern = /^(\w+)_(\d{4}(?:-\d{4})?)\.(csv)$/;
    const directMatch = name.match(directPattern);

    if (directMatch) {
      const [, type, year] = directMatch;
      const mappedType = reqs.abbreviations[type] || type;

      if (!reqs.validDatasetTypes.includes(mappedType)) {
        return {
          isValid: false,
          error: `Invalid dataset type: ${type}`,
          suggestion: `Valid types: ${reqs.validDatasetTypes.join(", ")}`,
        };
      }

      if (
        !reqs.validYears.includes(year) &&
        !reqs.validYears.includes(year.split("-")[0])
      ) {
        return {
          isValid: false,
          error: `Invalid year: ${year}`,
          suggestion: `Valid years: ${reqs.validYears.slice(-6).join(", ")}`,
        };
      }

      return { isValid: true, type: mappedType, year };
    }

    // Pattern 2: year/datatype.csv
    if (path) {
      const pathYearPattern = /\b(\d{4}(?:-\d{4})?)\//;
      const yearMatch = path.match(pathYearPattern);

      if (yearMatch) {
        const year = yearMatch[1];
        const typePattern = /^(\w+)\.(csv)$/;
        const typeMatch = name.match(typePattern);

        if (typeMatch) {
          const [, type] = typeMatch;
          const mappedType = reqs.abbreviations[type] || type;

          if (!reqs.validDatasetTypes.includes(mappedType)) {
            return {
              isValid: false,
              error: `Invalid dataset type: ${type}`,
              suggestion: `Valid types: ${reqs.validDatasetTypes.join(", ")}`,
            };
          }

          if (!reqs.validYears.includes(year)) {
            return {
              isValid: false,
              error: `Invalid year in path: ${year}`,
              suggestion: `Valid years: ${reqs.validYears
                .slice(-6)
                .join(", ")}`,
            };
          }

          return { isValid: true, type: mappedType, year };
        }
      }
    }

    return {
      isValid: false,
      error: "Invalid filename format",
      suggestion:
        "Examples: household_2019-2020.csv, household_2020.csv, or organize in folders like: 2020/household.csv",
    };
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find((file) =>
      file.name.toLowerCase().endsWith(".csv")
    );

    if (csvFile) {
      validateAndSetFile(csvFile, (csvFile as any).webkitRelativePath);
    } else {
      showToast("Please select a CSV file", "error");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file, (file as any).webkitRelativePath);
    }
  };

  const validateAndSetFile = (file: File, relativePath?: string) => {
    const validation = validateFilename(file.name, relativePath);
    setValidationResult(validation);

    if (validation.isValid) {
      setSelectedFile(file);
      showToast(
        `✅ File validated: ${validation.type} data for ${validation.year}`,
        "success"
      );
    } else {
      setSelectedFile(null);
      showToast(`❌ ${validation.error}`, "error");
      if (validation.suggestion) {
        setTimeout(
          () => showToast(`💡 ${validation.suggestion}`, "info"),
          1000
        );
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile && validationResult?.isValid) {
      uploadMutation.mutate({ file: selectedFile });
    }
  };

  const handleOverwriteConfirm = () => {
    if (selectedFile) {
      uploadMutation.mutate({ file: selectedFile, overwrite: true });
    }
  };

  const cancelOverwrite = () => {
    setShowOverwriteConfirm(false);
    setConflictData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Upload className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Upload Dataset
              </h1>
            </div>
            <button
              onClick={() => setShowRequirements(!showRequirements)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              <Info className="w-4 h-4" />
              Requirements
            </button>
          </div>

          {/* Requirements Panel */}
          {showRequirements && requirements && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">
                Upload Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* Valid Formats */}
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">
                    Valid Filename Formats:
                  </h4>
                  <ul className="space-y-1 text-blue-700">
                    {requirements.requirements.validNamingFormats.map(
                      (format, i) => (
                        <li key={i}>
                          <code className="bg-blue-100 px-1 rounded text-xs">
                            {format.format}
                          </code>
                          <div className="text-xs mt-1 ml-2">
                            Examples: {format.examples.join(", ")}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Valid Types and Years */}
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">
                    Valid Dataset Types:
                  </h4>
                  <div className="text-xs text-blue-700 mb-3">
                    {requirements.requirements.validDatasetTypes.join(", ")}
                  </div>

                  <h4 className="font-medium text-blue-800 mb-2">
                    Valid Years:
                  </h4>
                  <div className="text-xs text-blue-700">
                    {requirements.requirements.validYears.slice(-8).join(", ")}{" "}
                    and more...
                  </div>
                </div>
              </div>

              {/* Abbreviations */}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">
                  Supported Abbreviations:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-700">
                  {Object.entries(requirements.requirements.abbreviations).map(
                    ([abbrev, full]) => (
                      <div key={abbrev}>
                        <code className="bg-blue-100 px-1 rounded">
                          {abbrev}
                        </code>{" "}
                        → {full}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-8">
            Upload your CSV file with proper naming convention. The system will
            validate the filename and detect duplicates automatically.
          </p>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : validationResult?.isValid === false
                ? "border-red-300 bg-red-50"
                : validationResult?.isValid === true
                ? "border-green-300 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                {/* File Info */}
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`flex items-center gap-3 ${
                      validationResult?.isValid
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {validationResult?.isValid ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <AlertCircle className="w-8 h-8" />
                    )}
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      {validationResult?.isValid && (
                        <p className="text-xs text-green-600">
                          {validationResult.type} data for{" "}
                          {validationResult.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Validation Message */}
                {validationResult && !validationResult.isValid && (
                  <div className="p-3 bg-red-100 border border-red-200 rounded text-left max-w-md mx-auto">
                    <p className="text-sm font-medium text-red-800">
                      Validation Error:
                    </p>
                    <p className="text-sm text-red-700">
                      {validationResult.error}
                    </p>
                    {validationResult.suggestion && (
                      <p className="text-xs text-red-600 mt-2">
                        💡 {validationResult.suggestion}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleUpload}
                    disabled={
                      uploadMutation.isPending || !validationResult?.isValid
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setValidationResult(null);
                    }}
                    disabled={uploadMutation.isPending}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your CSV file here
                  </p>
                  <p className="text-gray-500">or click to browse</p>
                </div>

                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>

          {/* Examples - Updated */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Supported Filename Examples:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  <code className="bg-gray-200 px-1 rounded">
                    household_2019-2020.csv
                  </code>{" "}
                  → Household data
                </div>
                <div>
                  <code className="bg-gray-200 px-1 rounded">
                    women_2020.csv
                  </code>{" "}
                  → Women data
                </div>
                <div>
                  <code className="bg-gray-200 px-1 rounded">
                    child_2014-2015.csv
                  </code>{" "}
                  → Child data
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  <code className="bg-gray-200 px-1 rounded">hh_2020.csv</code>{" "}
                  → Household (abbreviated)
                </div>
                <div>
                  <code className="bg-gray-200 px-1 rounded">
                    wm_2019-2020.csv
                  </code>{" "}
                  → Women (abbreviated)
                </div>
                <div>
                  <code className="bg-gray-200 px-1 rounded">
                    2020/household.csv
                  </code>{" "}
                  → Folder structure
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overwrite Confirmation Modal */}
        {showOverwriteConfirm && conflictData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Dataset Already Exists
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <p>A dataset already exists for:</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p>
                    <strong>Type:</strong> {conflictData.conflict.datasetType}
                  </p>
                  <p>
                    <strong>Year:</strong> {conflictData.conflict.surveyYear}
                  </p>
                  <p>
                    <strong>Records:</strong>{" "}
                    {conflictData.conflict.existingRecords.toLocaleString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {conflictData.conflict.location}{" "}
                    table
                  </p>
                </div>
                <p className="text-orange-600">
                  ⚠️ Overwriting will completely replace the existing data, not
                  merge it.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleOverwriteConfirm}
                  disabled={uploadMutation.isPending}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploadMutation.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Replacing...
                    </>
                  ) : (
                    "Replace Existing Data"
                  )}
                </button>
                <button
                  onClick={cancelOverwrite}
                  disabled={uploadMutation.isPending}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
