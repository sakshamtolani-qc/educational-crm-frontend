import React, { useState } from 'react';
import './Filters.css';

export interface FeeFilters {
  studentName: string;
  studentId: string;
  course: string;
  dateFrom: string;
  dateTo: string;
  status: 'all' | 'pending' | 'paid';
}

interface FiltersProps {
  onFilterChange: (filters: FeeFilters) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [currentFilters, setCurrentFilters] = useState<FeeFilters>({
    studentName: '',
    studentId: '',
    course: '',
    dateFrom: '',
    dateTo: '',
    status: 'all',
  });
  
  const [studentInput, setStudentInput] = useState('');

  const parseStudentInput = (input: string) => {
    const hasDigit = /\d/.test(input);
    
    if (hasDigit) {
        return { studentName: '', studentId: input.trim() };
    } else {
        return { studentName: input.trim(), studentId: '' };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'studentInput') {
        setStudentInput(value);
        
        const parsed = parseStudentInput(value);
        setCurrentFilters((prev) => ({
            ...prev,
            ...parsed,
        }));
        return;
    }
    
    setCurrentFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(currentFilters);
  };

  const handleResetFilters = () => {
    const resetValues: FeeFilters = {
      studentName: '',
      studentId: '',
      course: '',
      dateFrom: '',
      dateTo: '',
      status: 'all',
    };
    setStudentInput('');
    setCurrentFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="fee-filters-card">
      <div className="filter-group">
        <label htmlFor="studentInput">Student Name / ID</label>
        <input
          type="text"
          id="studentInput"
          name="studentInput"
          value={studentInput}
          onChange={handleChange}
          placeholder="Search by Student Name or ID"
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="course">Course</label>
        <input
          type="text"
          id="course"
          name="course"
          value={currentFilters.course}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="dateFrom">Date From</label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          value={currentFilters.dateFrom}
          onChange={handleChange}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="dateTo">Date To</label>
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          value={currentFilters.dateTo}
          onChange={handleChange}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={currentFilters.status}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="filter-actions">
        <button onClick={handleApplyFilters} className="primary-button filter-button">
          Apply Filters
        </button>
        <button onClick={handleResetFilters} className="secondary-button filter-button">
          Reset
        </button>
      </div>
    </div>
  );
};