import React, { useState, useEffect } from 'react';
import AttendanceFilters, { AttendanceFiltersData } from '@/components/Admin/Attendance/AttendanceFilters';
import AttendanceBulkActions from '@/components/Admin/Attendance/AttendanceBulkActions';
import AttendanceTable from '@/components/Admin/Attendance/AttendanceTable';
import { Student, AttendanceStatus } from '@/components/Admin/Attendance/StudentRow'; 
import styles from './AttendancePage.module.css';
import { Save } from 'lucide-react'; 

const fetchStudents = async (filters: AttendanceFiltersData): Promise<Student[]> => {
  console.log('Fetching students with filters:', filters);
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const baseStudents: Student[] = [
    { id: 1, name: 'Alice Smith', enrollmentNo: 'EN001', facultyName: 'Dr. John Doe' },
    { id: 2, name: 'Bob Johnson', enrollmentNo: 'EN002', facultyName: 'Dr. John Doe' },
    { id: 3, name: 'Charlie Brown', enrollmentNo: 'EN003', facultyName: 'Prof. Jane Green' },
    { id: 4, name: 'Diana Prince', enrollmentNo: 'EN004', facultyName: 'Prof. Jane Green' },
    { id: 5, name: 'Eve Adams', enrollmentNo: 'EN005', facultyName: 'Dr. John Doe' },
    { id: 6, name: 'Frank White', enrollmentNo: 'EN006', facultyName: 'Prof. Jane Green' },
    { id: 7, name: 'Grace Black', enrollmentNo: 'EN007', facultyName: 'Dr. John Doe' },
    { id: 8, name: 'Henry King', enrollmentNo: 'EN008', facultyName: 'Prof. Jane Green' },
    { id: 9, name: 'Ivy Queen', enrollmentNo: 'EN009', facultyName: 'Dr. John Doe' },
    { id: 10, name: 'Jack Knight', enrollmentNo: 'EN010', facultyName: 'Prof. Jane Green' },
    { id: 11, name: 'Karen Page', enrollmentNo: 'EN011', facultyName: 'Dr. John Doe' },
    { id: 12, name: 'Liam Neeson', enrollmentNo: 'EN012', facultyName: 'Prof. Jane Green' },
  ];

  return baseStudents.slice(0, 10); 
};

const saveAttendance = async (
  attendanceRecords: {
    studentId: number;
    status: AttendanceStatus;
    courseId: number;
    subjectId: number;
    date: string;
  }[],
  filters: AttendanceFiltersData
) => {
  console.log('Saving attendance:', attendanceRecords, 'for filters:', filters);
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  return { success: true, message: 'Attendance saved successfully!' };
};

type AttendancePageProps = {
  sidebarOpen: boolean; 
};

const AttendancePage: React.FC<AttendancePageProps> = ({ sidebarOpen }) => {
  const [filters, setFilters] = useState<AttendanceFiltersData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceStatusMap, setAttendanceStatusMap] = useState<{ [studentId: number]: AttendanceStatus }>({});
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSavingAttendance, setIsSavingAttendance] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadStudents = async () => {
      if (filters) {
        setIsLoadingStudents(true);
        setStudents([]); 
        setAttendanceStatusMap({});
        setSelectedStudents(new Set()); 
        try {
          const fetchedStudents = await fetchStudents(filters);
          setStudents(fetchedStudents);

          const initialAttendance: { [studentId: number]: AttendanceStatus } = {};
          fetchedStudents.forEach(student => {
            initialAttendance[student.id] = 'Absent';
          });
          setAttendanceStatusMap(initialAttendance);
        } catch (error) {
          console.error('Failed to load students:', error);
          alert('Failed to load students. Please try again.');
        } finally {
          setIsLoadingStudents(false);
        }
      }
    };
    loadStudents();
  }, [filters]);

  const handleApplyFilters = (newFilters: AttendanceFiltersData) => {
    setFilters(newFilters);
  };

  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    setAttendanceStatusMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleBulkAction = (status: AttendanceStatus) => {
    const updatedMap: { [studentId: number]: AttendanceStatus } = {};
    if (selectedStudents.size > 0) {
      
      students.forEach(student => {
        if (selectedStudents.has(student.id)) {
          updatedMap[student.id] = status;
        } else {
          updatedMap[student.id] = attendanceStatusMap[student.id]; 
        }
      });
    } else {
      students.forEach(student => {
        updatedMap[student.id] = status;
      });
    }
    setAttendanceStatusMap(updatedMap);
  };

  const handleStudentCheckboxChange = (studentId: number, isChecked: boolean) => {
    setSelectedStudents(prev => {
      const newSelection = new Set(prev);
      if (isChecked) {
        newSelection.add(studentId);
      } else {
        newSelection.delete(studentId);
      }
      return newSelection;
    });
  };

  const handleSelectAllCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedStudents(new Set(students.map(s => s.id)));
    } else {
      setSelectedStudents(new Set());
    }
  };

  const handleSaveAttendance = async () => {
    if (!filters || students.length === 0) {
      alert('No students loaded or filters not applied.');
      return;
    }

    const attendanceRecords = students.map((student) => ({
      studentId: student.id,
      status: attendanceStatusMap[student.id] || 'Absent', 
      courseId: filters.courseId!,
      subjectId: filters.subjectId!,
      date: filters.date,
    }));

    setIsSavingAttendance(true);
    try {
      const result = await saveAttendance(attendanceRecords, filters);
      if (result.success) {
        alert(result.message);
        setSelectedStudents(new Set());
      } else {
        alert('Failed to save attendance.');
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('An error occurred while saving attendance.');
    } finally {
      setIsSavingAttendance(false);
    }
  };

  const hasStudents = students.length > 0;
  const canSave = hasStudents && filters?.courseId && filters?.subjectId && filters?.date;

  return (
    <div className={`${styles.attendancePageContainer} ${sidebarOpen ? styles['sidebar-open'] : ''}`}>
      <div className={styles.attendanceHeader}>
        <h1>Student Attendance</h1>
        <button
          className={styles.saveAttendanceBtn}
          onClick={handleSaveAttendance}
          disabled={isSavingAttendance || !canSave}
        >
          {isSavingAttendance ? 'Saving...' : 'Save Attendance'}
          {!isSavingAttendance && <Save size={20} />}
        </button>
      </div>

      <AttendanceFilters
        onApplyFilters={handleApplyFilters}
        isLoadingStudents={isLoadingStudents}
      />

      {hasStudents && (
        <AttendanceBulkActions
          onBulkAction={handleBulkAction}
          hasStudents={hasStudents}
        />
      )}

      <AttendanceTable
        students={students}
        attendanceStatusMap={attendanceStatusMap}
        onStatusChange={handleStatusChange}
        onSelectAll={handleBulkAction} 
        selectedStudents={selectedStudents}
        onStudentCheckboxChange={handleStudentCheckboxChange}
        onSelectAllCheckboxChange={handleSelectAllCheckboxChange}
      />
    </div>
  );
};

export default AttendancePage;