import React from 'react';
import { Search } from 'lucide-react';
import './FacultyFilters.css';

interface FacultyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const FacultyFilters: React.FC<FacultyFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="faculty-filters">
      <div className="search-box">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search by Name / Faculty ID / Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="department-filter">Filter by Department:</label>
          <select
            id="department-filter"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name</option>
            <option value="id">Faculty ID</option>
            <option value="department">Department</option>
            <option value="hire_date">Hire Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
};