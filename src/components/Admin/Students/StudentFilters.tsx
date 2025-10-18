import React from 'react';
import { Search } from 'lucide-react';
import './StudentFilters.css';

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  courseFilter: string;
  setCourseFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  courseFilter,
  setCourseFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="student-filters">
      <div className="search-box">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search by Name / Roll No / Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="course-filter">Filter by Course:</label>
          <select
            id="course-filter"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Courses</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
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
            <option value="rollNo">Roll No</option>
            <option value="course">Course</option>
            <option value="year">Year</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
};
