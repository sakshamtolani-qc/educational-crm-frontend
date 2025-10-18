import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Faculty } from '@/pages/FacultiesPage/FacultiesPage';
import "./FacultyTable.css";

interface FacultyTableProps {
  faculties: Faculty[];
  onEdit: (faculty: Faculty) => void;
  onDelete: (id: string) => void;
  onView: (faculty: Faculty) => void;
}

const FacultyTable: React.FC<FacultyTableProps> = ({
  faculties,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="table-container">
      <table className="faculty-table">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Designation</th>
            <th>Hire Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.length === 0 ? (
            <tr>
              <td colSpan={9} className="no-data">
                No faculty members found
              </td>
            </tr>
          ) : (
            faculties.map((faculty) => (
              <tr key={faculty.id}>
                <td className="faculty-id">{faculty.id}</td>
                <td className="faculty-name">{faculty.name}</td>
                <td className="faculty-email">{faculty.email}</td>
                <td className="faculty-department">{faculty.department}</td>
                <td className="faculty-specialization">{faculty.specialization}</td>
                <td className="faculty-designation">{faculty.designation}</td>
                <td className="faculty-hire-date">{faculty.hire_date}</td>
                <td>
                  <span className={`status-badge ${faculty.status.toLowerCase()}`}>
                    {faculty.status}
                  </span>
                </td>
                <td className="actions-cell">
                  
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(faculty)}
                    title="Edit Faculty"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(faculty.id)}
                    title="Delete Faculty"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyTable;