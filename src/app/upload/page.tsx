"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HealthDataService } from "@/services/healthDataService";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function DataUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    datasetType: "",
    surveyYear: new Date().getFullYear().toString(),
  });
  const [uploadResult, setUploadResult] = useState<any>(null);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: ({ file, metadata }: { file: File; metadata: any }) =>
      HealthDataService.uploadDataFile(file, metadata),
    onSuccess: (data) => {
      setUploadResult(data);
      queryClient.invalidateQueries({ queryKey: ["healthIndicators"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: (error: any) => {
      console.error("Upload failed:", error);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);

      // Auto-detect dataset type from filename
      const filename = file.name.toLowerCase();
      if (filename.includes("child"))
        setMetadata((prev) => ({ ...prev, datasetType: "child" }));
      else if (filename.includes("woman") || filename.includes("women"))
        setMetadata((prev) => ({ ...prev, datasetType: "woman" }));
      else if (filename.includes("household"))
        setMetadata((prev) => ({ ...prev, datasetType: "household" }));
      else if (filename.includes("male") || filename.includes("men"))
        setMetadata((prev) => ({ ...prev, datasetType: "male" }));
      else if (filename.includes("birth"))
        setMetadata((prev) => ({ ...prev, datasetType: "birth" }));
      else setMetadata((prev) => ({ ...prev, datasetType: "general" }));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate({ file: selectedFile, metadata });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📊 Dynamic Dataset Upload
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload new CSV datasets to expand the health analytics platform.
              Files are automatically processed and integrated into the system.
            </p>
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            {/* File Selection */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csvFile"
              />
              <label htmlFor="csvFile" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Choose CSV File
                </h3>
                <p className="text-gray-600">
                  Drag & drop or click to select a CSV file (max 100MB)
                </p>
              </label>
            </div>

            {/* Selected File Info */}
            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">
                      {selectedFile.name}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {formatFileSize(selectedFile.size)} • Last modified:{" "}
                      {selectedFile.lastModified
                        ? new Date(
                            selectedFile.lastModified
                          ).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata Form */}
            {selectedFile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dataset Type
                  </label>
                  <select
                    value={metadata.datasetType}
                    onChange={(e) =>
                      setMetadata((prev) => ({
                        ...prev,
                        datasetType: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type...</option>
                    <option value="child">Child Health</option>
                    <option value="woman">Women's Health</option>
                    <option value="household">Household Survey</option>
                    <option value="male">Men's Health</option>
                    <option value="birth">Birth Records</option>
                    <option value="general">General Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Survey Year
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max={new Date().getFullYear()}
                    value={metadata.surveyYear}
                    onChange={(e) =>
                      setMetadata((prev) => ({
                        ...prev,
                        surveyYear: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Upload Button */}
            {selectedFile && (
              <div className="text-center">
                <button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending || !metadata.datasetType}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="-ml-1 mr-3 h-5 w-5" />
                      Upload & Process Dataset
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Upload Result */}
            {uploadMutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-900">Upload Failed</h3>
                    <p className="text-sm text-red-700 mt-1">
                      {uploadMutation.error?.message ||
                        "An error occurred during upload"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploadResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="font-medium text-green-900">
                    Upload Successful!
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 font-medium">
                        Total Records:
                      </span>
                      <br />
                      <span className="text-green-900">
                        {uploadResult.totalProcessed?.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">
                        File Size:
                      </span>
                      <br />
                      <span className="text-green-900">
                        {uploadResult.metadata?.fileSize} KB
                      </span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">
                        Columns:
                      </span>
                      <br />
                      <span className="text-green-900">
                        {uploadResult.metadata?.columns?.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">
                        Survey Year:
                      </span>
                      <br />
                      <span className="text-green-900">
                        {uploadResult.metadata?.surveyYear}
                      </span>
                    </div>
                  </div>

                  {uploadResult.stats && uploadResult.stats.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-900 mb-2">
                        Generated Statistics:
                      </h4>
                      <div className="space-y-1">
                        {uploadResult.stats.map((stat: any, index: number) => (
                          <div key={index} className="text-sm text-green-800">
                            <strong>
                              {stat.indicator.replace("_", " ").toUpperCase()}:
                            </strong>{" "}
                            {stat.value} {stat.unit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadResult.sampleRecords && (
                    <div>
                      <h4 className="font-medium text-green-900 mb-2">
                        Sample Records Preview:
                      </h4>
                      <div className="text-xs text-green-800 bg-green-100 p-2 rounded max-h-32 overflow-y-auto">
                        <pre>
                          {JSON.stringify(
                            uploadResult.sampleRecords.slice(0, 3),
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
