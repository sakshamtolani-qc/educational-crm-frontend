import React from 'react';
import { Search } from 'lucide-react';
import './SubjectFilter.css';

interface SubjectFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
}

export const SubjectFilters: React.FC<SubjectFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
}) => {
    return (
        <div className="subject-filters">
            <div className="search-box">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by Name / Code / Course / Faculty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-controls">
                <div className="filter-group">
                    <label htmlFor="sort-by">Sort by:</label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="name">Subject Name</option>
                        <option value="code">Subject Code</option>
                        <option value="credits">Credits</option>
                        <option value="courseName">Course Name</option>
                    </select>
                </div>
            </div>
        </div>
    );
};