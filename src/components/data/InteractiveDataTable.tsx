/**
 * Interactive Data Table Component
 * Rich table with filtering, sorting, pagination, and export
 */

"use client";

import React, { useState } from 'react';
import { useTableData } from '../../hooks/useHealthData';
import { exportToCSV } from '../../utils/data/csvParser';
import { Download, Filter, Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

interface InteractiveDataTableProps {
  datasetName?: string;
  title?: string;
  className?: string;
}

export default function InteractiveDataTable({ 
  datasetName, 
  title = "Health Data Explorer",
  className = ""
}: InteractiveDataTableProps) {
  const {
    data,
    totalRows,
    currentPage,
    totalPages,
    pageSize,
    isLoading,
    headers,
    availableDatasets,
    setCurrentPage,
    setPageSize,
    setFilters,
    setSortConfig,
    sortConfig
  } = useTableData(datasetName);

  const [selectedDataset, setSelectedDataset] = useState(datasetName || '');
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({});

  // Handle dataset change
  const handleDatasetChange = (datasetName: string) => {
    setSelectedDataset(datasetName);
    window.location.href = `?dataset=${datasetName}`;
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term) {
      const searchFilters = headers.reduce((acc, header) => {
        acc[header] = term;
        return acc;
      }, {} as { [key: string]: string });
      
      setFilters(searchFilters);
    } else {
      setFilters({});
    }
  };

  // Handle column filtering
  const handleColumnFilter = (column: string, value: string) => {
    const newFilters = { ...columnFilters, [column]: value };
    setColumnFilters(newFilters);
    
    const activeFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== '')
    );
    setFilters(activeFilters);
  };

  // Handle sorting
  const handleSort = (column: string) => {
    const direction = sortConfig?.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: column, direction });
  };

  // Handle export
  const handleExport = () => {
    if (data.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${selectedDataset || 'health-data'}_${timestamp}.csv`;
    exportToCSV(data, filename);
  };

  // Pagination controls
  const getPaginationPages = () => {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">
              {totalRows.toLocaleString()} records across {availableDatasets.length} datasets
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className="flex items-center gap-2 px-4 py-2 bg-nsir-primary text-white rounded-lg hover:bg-nsir-primary/90 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <button
              onClick={handleExport}
              disabled={data.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-nsir-secondary text-white rounded-lg hover:bg-nsir-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Dataset Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dataset
            </label>
            <select
              value={selectedDataset}
              onChange={(e) => handleDatasetChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nsir-primary focus:border-nsir-primary"
            >
              <option value="">All Datasets</option>
              {availableDatasets.map((dataset) => (
                <option key={dataset.name} value={dataset.name}>
                  {dataset.name} ({dataset.year}) - {dataset.rows.toLocaleString()} rows
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search across all columns..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-nsir-primary focus:border-nsir-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rows per page
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nsir-primary focus:border-nsir-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Column Filters */}
        {filterVisible && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Column Filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {headers.slice(0, 12).map((header) => (
                <div key={header}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {header}
                  </label>
                  <input
                    type="text"
                    placeholder={`Filter ${header}...`}
                    value={columnFilters[header] || ''}
                    onChange={(e) => handleColumnFilter(header, e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-nsir-primary focus:border-nsir-primary"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {header}
                    {sortConfig?.key === header && (
                      sortConfig.direction === 'asc' ? 
                        <ArrowUp className="w-3 h-3" /> : 
                        <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row[header] === null ? (
                      <span className="text-gray-400 italic">N/A</span>
                    ) : (
                      String(row[header])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalRows)} of {totalRows} results
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              {getPaginationPages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    currentPage === page
                      ? 'bg-nsir-primary text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">No data found</div>
          <div className="text-sm text-gray-400">
            Try adjusting your filters or search criteria
          </div>
        </div>
      )}
    </div>
  );
}
