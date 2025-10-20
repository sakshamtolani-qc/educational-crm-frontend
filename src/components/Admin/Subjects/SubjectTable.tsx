import React from 'react';
import { Edit2, Trash2, UserPlus } from 'lucide-react';
import { Subject } from '@/pages/SubjectsPage/SubjectsPage';
import './SubjectTable.css';

interface SubjectTableProps {
  subjects: Subject[];
  onEdit: (subject: Subject) => void;
  onDelete: (id: number) => void;
  onAssignFaculty: (subject: Subject) => void;
}

export const SubjectTable: React.FC<SubjectTableProps> = ({
  subjects,
  onEdit,
  onDelete,
  onAssignFaculty,
}) => {
  if (subjects.length === 0) {
    return (
      <div className="empty-state">
        <p>No subjects found. Click "Add Subject" to create one.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Code</th>
            <th>Credits</th>
            <th>Course</th>
            <th>Assigned Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="subject-name">{subject.name}</td>
              <td className="subject-code">{subject.code}</td>
              <td>{subject.credits}</td>
              <td>{subject.courseName || 'N/A'}</td>
              <td>
                {subject.facultyName ? (
                  <span className="faculty-badge">{subject.facultyName}</span>
                ) : (
                  <span className="no-faculty">Not Assigned</span>
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(subject)}
                    title="Edit Subject"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="action-btn assign-btn"
                    onClick={() => onAssignFaculty(subject)}
                    title="Assign Faculty"
                  >
                    <UserPlus size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(subject.id)}
                    title="Delete Subject"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
