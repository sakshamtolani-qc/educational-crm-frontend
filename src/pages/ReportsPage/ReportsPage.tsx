import React, { useState } from 'react';
import { Filters } from '@/components/Admin/Reports/Filters';
import { SummaryCards } from '@/components/Admin/Reports/SummaryCards';
import { ReportsTable } from '@/components/Admin/Reports/ReportsTable';
import { Charts } from '@/components/Admin/Reports/Charts';
import { FileDown, FileText, Printer } from 'lucide-react';
import './ReportsPage.css';

export interface ReportFilters {
  reportType: string;
  course: string;
  faculty: string;
  student: string;
  dateFrom: string;
  dateTo: string;
}

export const ReportsPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: 'admissions',
    course: '',
    faculty: '',
    student: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleFilterChange = (newFilters: ReportFilters) => {
    setFilters(newFilters);
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    console.log(`Exporting ${type.toUpperCase()}...`);
    alert(`${type.toUpperCase()} export functionality will be implemented with backend`);
  };

  const handlePrint = () => {
    console.log('Printing...');
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1 className="reports-title">Reports & Analytics</h1>
          <p className="reports-subtitle">Generate and analyze comprehensive reports</p>
        </div>
        <div className="export-actions">
          <button className="export-btn" onClick={() => handleExport('csv')}>
            <FileDown size={18} />
            <span>Export CSV</span>
          </button>
          <button className="export-btn" onClick={() => handleExport('pdf')}>
            <FileText size={18} />
            <span>Export PDF</span>
          </button>
          <button className="export-btn" onClick={handlePrint}>
            <Printer size={18} />
            <span>Print</span>
          </button>
        </div>
      </div>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <SummaryCards reportType={filters.reportType} />

      <Charts reportType={filters.reportType} />

      <ReportsTable reportType={filters.reportType} filters={filters} />
    </div>
  );
};
