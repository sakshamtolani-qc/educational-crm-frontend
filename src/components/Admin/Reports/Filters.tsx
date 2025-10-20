import React from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import './Filters.css';

interface FiltersProps {
  filters: {
    reportType: string;
    course: string;
    faculty: string;
    student: string;
    dateFrom: string;
    dateTo: string;
  };
  onFilterChange: (filters: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleReset = () => {
    onFilterChange({
      reportType: 'admissions',
      course: '',
      faculty: '',
      student: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleApply = () => {
    console.log('Applying filters:', filters);
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <div className="filters-title-section">
          <Filter size={20} />
          <h2 className="filters-title">Filters</h2>
        </div>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Report Type</label>
          <select
            className="filter-select"
            value={filters.reportType}
            onChange={(e) => handleChange('reportType', e.target.value)}
          >
            <option value="admissions">Admissions Report</option>
            <option value="attendance">Attendance Report</option>
            <option value="exams">Exams Report</option>
            <option value="fees">Fees Report</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Course</label>
          <select
            className="filter-select"
            value={filters.course}
            onChange={(e) => handleChange('course', e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="computer-science">Computer Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Faculty</label>
          <select
            className="filter-select"
            value={filters.faculty}
            onChange={(e) => handleChange('faculty', e.target.value)}
          >
            <option value="">All Faculties</option>
            <option value="john-doe">Dr. John Doe</option>
            <option value="jane-smith">Prof. Jane Smith</option>
            <option value="robert-johnson">Dr. Robert Johnson</option>
            <option value="emily-brown">Prof. Emily Brown</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Student</label>
          <select
            className="filter-select"
            value={filters.student}
            onChange={(e) => handleChange('student', e.target.value)}
          >
            <option value="">All Students</option>
            <option value="alice-williams">Alice Williams</option>
            <option value="bob-anderson">Bob Anderson</option>
            <option value="carol-davis">Carol Davis</option>
            <option value="david-miller">David Miller</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Date From</label>
          <input
            type="date"
            className="filter-input"
            value={filters.dateFrom}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Date To</label>
          <input
            type="date"
            className="filter-input"
            value={filters.dateTo}
            onChange={(e) => handleChange('dateTo', e.target.value)}
          />
        </div>
      </div>

      <div className="filters-actions">
        <button className="filter-btn filter-btn-reset" onClick={handleReset}>
          <RefreshCw size={18} />
          <span>Reset</span>
        </button>
        <button className="filter-btn filter-btn-apply" onClick={handleApply}>
          <Filter size={18} />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  );
};
