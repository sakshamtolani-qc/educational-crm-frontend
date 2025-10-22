import React, { useState, useEffect } from 'react';
import styles from './Attendance.module.css';

// Mock API calls (unchanged)
const fetchCourses = async () => {
  return [
    { id: 1, name: 'B.Tech' },
    { id: 2, name: 'M.Tech' },
    { id: 3, name: 'BCA' },
    { id: 4, name: 'MCA' },
  ];
};

const fetchSubjectsByCourse = async (courseId: number) => {
  if (courseId === 1) return [{ id: 101, name: 'Computer Science' }, { id: 102, name: 'Data Structures' }];
  if (courseId === 2) return [{ id: 201, name: 'Advanced Algorithms' }, { id: 202, name: 'Machine Learning' }];
  if (courseId === 3) return [{ id: 301, name: 'Web Development' }, { id: 302, name: 'Database Management' }];
  if (courseId === 4) return [{ id: 401, name: 'Cloud Computing' }, { id: 402, name: 'Big Data Analytics' }];
  return [];
};

export type AttendanceFiltersData = {
  year: string;
  courseId: number | null;
  subjectId: number | null;
  date: string;
};

type AttendanceFiltersProps = {
  onApplyFilters: (filters: AttendanceFiltersData) => void;
  isLoadingStudents: boolean;
};

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({ onApplyFilters, isLoadingStudents }) => {
  const [years] = useState(['1st Year', '2nd Year', '3rd Year', '4th Year']);
  const [courses, setCourses] = useState<{ id: number; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); 

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };
    getCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      const getSubjects = async () => {
        const data = await fetchSubjectsByCourse(selectedCourseId);
        setSubjects(data);
        setSelectedSubjectId(null); 
      };
      getSubjects();
    } else {
      setSubjects([]);
      setSelectedSubjectId(null);
    }
  }, [selectedCourseId]);

  const handleLoadStudents = () => {
    if (selectedYear && selectedCourseId && selectedSubjectId && selectedDate) {
      onApplyFilters({
        year: selectedYear,
        courseId: selectedCourseId,
        subjectId: selectedSubjectId,
        date: selectedDate,
      });
    } else {
      alert('Please select Year, Course, Subject, and Date to load students.');
    }
  };

  return (
    <div className={styles.attendanceContainer}>
      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="year">Year</label>
          <div className={styles.selectWrapper}> {/* Add wrapper here */}
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="course">Course</label>
          <div className={styles.selectWrapper}> {/* Add wrapper here */}
            <select
              id="course"
              value={selectedCourseId || ''}
              onChange={(e) => setSelectedCourseId(Number(e.target.value))}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="subject">Subject</label>
          <div className={styles.selectWrapper}> {/* Add wrapper here */}
            <select
              id="subject"
              value={selectedSubjectId || ''}
              onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
              disabled={!selectedCourseId}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button
          className={styles.loadStudentsBtn}
          onClick={handleLoadStudents}
          disabled={isLoadingStudents || !selectedYear || !selectedCourseId || !selectedSubjectId || !selectedDate}
        >
          {isLoadingStudents ? 'Loading...' : 'Load Students'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceFilters;