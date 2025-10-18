import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Course } from '@/pages/CoursesPage/CoursesPage';
import "./CourseTable.css";

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Duration (Months)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">
                No courses found
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td className="course-code">{course.code}</td>
                <td className="course-name">{course.name}</td>
                <td className="course-description">{course.description}</td>
                <td className="course-credits">{course.credits}</td>
                <td className="course-duration">{course.duration}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(course)}
                    title="Edit Course"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(course.id)}
                    title="Delete Course"
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

export default CourseTable;
