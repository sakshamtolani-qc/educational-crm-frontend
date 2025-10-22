import React from 'react';
import styles from './Attendance.module.css';

export type AttendanceStatus = 'Present' | 'Absent' | 'Leave';

export type Student = {
  id: number;
  name: string;
  enrollmentNo: string;
  facultyName: string;
};

type StudentRowProps = {
  student: Student;
  attendanceStatus: AttendanceStatus;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onCheckboxChange: (studentId: number, isChecked: boolean) => void;
  isSelected: boolean;
};

const StudentRow: React.FC<StudentRowProps> = ({
  student,
  attendanceStatus,
  onStatusChange,
  onCheckboxChange,
  isSelected,
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onCheckboxChange(student.id, e.target.checked)}
          style={{ accentColor: '#27ac1f' }}
        />
      </td>
      <td>{student.name}</td>
      <td>{student.enrollmentNo}</td>
      <td>{student.facultyName}</td>
      <td>
        <select
          className={`${styles.statusDropdown} ${styles[`status-${attendanceStatus}`]}`}
          value={attendanceStatus}
          onChange={(e) => onStatusChange(student.id, e.target.value as AttendanceStatus)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
      </td>
      <td className={styles.actionsCell}>
        <button
          className={`${styles.actionBtn} ${styles.present}`}
          onClick={() => onStatusChange(student.id, 'Present')}
        >
          Present
        </button>
        <button
          className={`${styles.actionBtn} ${styles.absent}`}
          onClick={() => onStatusChange(student.id, 'Absent')}
        >
          Absent
        </button>
        <button
          className={`${styles.actionBtn} ${styles.leave}`}
          onClick={() => onStatusChange(student.id, 'Leave')}
        >
          Leave
        </button>
      </td>

    </tr>
  );
};

export default StudentRow;
