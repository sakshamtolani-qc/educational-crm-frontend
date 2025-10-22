import React, { useState, useEffect } from "react";
import styles from "./Attendance.module.css";
import StudentRow, { Student, AttendanceStatus } from "./StudentRow";
import SelectAllCheckbox from "./SelectAllCheckbox";

type AttendanceTableProps = {
  students: Student[];
  attendanceStatusMap: { [studentId: number]: AttendanceStatus };
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onSelectAll: (status: AttendanceStatus) => void;
  selectedStudents: Set<number>;
  onStudentCheckboxChange: (studentId: number, isChecked: boolean) => void;
  onSelectAllCheckboxChange: (isChecked: boolean) => void;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  students,
  attendanceStatusMap,
  onStatusChange,
  onSelectAll,
  selectedStudents,
  onStudentCheckboxChange,
  onSelectAllCheckboxChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(students.length / pageSize);
  const currentStudents = students.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const allStudentsSelected =
    students.length > 0 && selectedStudents.size === students.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (students.length === 0) {
    return (
      <div className={styles.noStudentsMessage}>
        No students loaded for the selected filters. Please use the filters
        above to load students.
      </div>
    );
  }

  return (
    <div className={styles.attendanceTableContainer}>
      <table className={styles.attendanceTable}>
        <thead>
          <tr>
            <th>
              <SelectAllCheckbox
                isChecked={allStudentsSelected}
                onChange={onSelectAllCheckboxChange}
                disabled={students.length === 0}
              />
            </th>
            <th>Student Name</th>
            <th>Enrollment No</th>
            <th>Faculty Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              attendanceStatus={attendanceStatusMap[student.id] || "Absent"}
              onStatusChange={onStatusChange}
              onCheckboxChange={onStudentCheckboxChange}
              isSelected={selectedStudents.has(student.id)}
            />
          ))}
        </tbody>
      </table>

      <div className={styles.paginationContainer}>
        <span className={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </span>
        <div className={styles.paginationButtons}>
          <button
            className={styles.paginationButton}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
