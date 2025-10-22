import React from 'react';
import styles from './Attendance.module.css';

type AttendanceBulkActionsProps = {
  onBulkAction: (status: 'Present' | 'Absent' | 'Leave') => void;
  hasStudents: boolean;
};

const AttendanceBulkActions: React.FC<AttendanceBulkActionsProps> = ({ onBulkAction, hasStudents }) => {
  return (
    <div className={styles.attendanceContainer}>
      <h3>Bulk Actions</h3>
      <div className={styles.bulkActions}>
        <button
          className={styles.bulkActionButton}
          onClick={() => onBulkAction('Present')}
          disabled={!hasStudents}
        >
          Mark All Present
        </button>
        <button
          className={styles.bulkActionButton}
          onClick={() => onBulkAction('Absent')}
          disabled={!hasStudents}
        >
          Mark All Absent
        </button>
        <button
          className={styles.bulkActionButton}
          onClick={() => onBulkAction('Leave')}
          disabled={!hasStudents}
        >
          Mark All Holiday / Leave
        </button>
      </div>
    </div>
  );
};

export default AttendanceBulkActions;