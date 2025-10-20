import React from 'react';
import { Check } from 'lucide-react';
import { Faculty } from '@/pages/SubjectsPage/SubjectsPage';
import './FacultySelectList.css';

interface FacultySelectListProps {
  faculties: Faculty[];
  selectedFacultyId: number | null;
  onSelect: (facultyId: number) => void;
}

export const FacultySelectList: React.FC<FacultySelectListProps> = ({
  faculties,
  selectedFacultyId,
  onSelect,
}) => {
  if (faculties.length === 0) {
    return (
      <div className="faculty-empty">
        <p>No faculty members available.</p>
      </div>
    );
  }

  return (
    <div className="faculty-list">
      {faculties.map((faculty) => {
        const isSelected = selectedFacultyId === faculty.id;
        return (
          <div
            key={faculty.id}
            className={`faculty-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(faculty.id)}
          >
            <div className="faculty-avatar">
              {faculty.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="faculty-details">
              <div className="faculty-name">{faculty.name}</div>
              <div className="faculty-meta">
                <span className="faculty-department">{faculty.department}</span>
                <span className="faculty-separator">•</span>
                <span className="faculty-designation">{faculty.designation}</span>
              </div>
            </div>
            {isSelected && (
              <div className="faculty-check">
                <Check size={20} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
