import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Student } from '@/pages/StudentsPage/StudentsPage';
import './StudentTable.css';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onView: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={7} className="no-data">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td className="roll-no">{student.rollNo}</td>
                <td className="student-name">{student.name}</td>
                <td className="student-email">{student.email}</td>
                <td className="student-course">{student.course}</td>
                <td className="student-year">Year {student.year}</td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td className="actions-cell">
                 
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(student)}
                    title="Edit Student"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(student.id)}
                    title="Delete Student"
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
