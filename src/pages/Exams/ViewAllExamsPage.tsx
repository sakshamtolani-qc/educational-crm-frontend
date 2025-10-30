import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, X, Plus } from 'lucide-react';
import { ExamCard } from '@/components/Admin/Exams/ExamCard';
import { ExamForm } from '@/components/Admin/Exams/ExamForm';
import './ViewAllExamsPage.css';

const LOCAL_STORAGE_KEY = 'mockExamsData';

const INITIAL_MOCK_EXAMS = [
  { id: 'mock-mid-1', title: 'Midterm 1: Algebra', exam_type: 'midterm', exam_date: '2024-10-25', total_marks: 100, courses: { name: 'Mathematics 101' }, subjects: { name: 'Algebra' } },
  { id: 'mock-mid-2', title: 'Midterm 2: Chemistry Basics', exam_type: 'midterm', exam_date: '2024-10-20', total_marks: 75, courses: { name: 'Science 201' }, subjects: { name: 'Chemistry' } },
  { id: 'mock-final-1', title: 'Final: Physics III', exam_type: 'final', exam_date: '2024-12-15', total_marks: 150, courses: { name: 'Physics 301' }, subjects: { name: 'Electromagnetism' } },
  { id: 'mock-final-2', title: 'Final: Literature Review', exam_type: 'final', exam_date: '2024-12-10', total_marks: 50, courses: { name: 'English 101' }, subjects: { name: 'Poetry' } },
  { id: 'mock-quiz-1', title: 'Quiz 1: Set Theory', exam_type: 'quiz', exam_date: '2024-10-01', total_marks: 20, courses: { name: 'Mathematics 101' }, subjects: { name: 'Algebra' } },
  { id: 'mock-mid-3', title: 'Midterm 3: Database Design', exam_type: 'midterm', exam_date: '2024-09-15', total_marks: 80, courses: { name: 'Computer Science 101' }, subjects: { name: 'Databases' } },
  { id: 'mock-mid-4', title: 'Midterm 4: History', exam_type: 'midterm', exam_date: '2024-09-01', total_marks: 100, courses: { name: 'Humanities 101' }, subjects: { name: 'Ancient World' } },
  { id: 'mock-mid-5', title: 'Midterm 5: Biology', exam_type: 'midterm', exam_date: '2024-08-20', total_marks: 70, courses: { name: 'Science 201' }, subjects: { name: 'Biology' } },
  { id: 'mock-mid-6', title: 'Midterm 6: Ethics', exam_type: 'midterm', exam_date: '2024-08-01', total_marks: 50, courses: { name: 'Humanities 101' }, subjects: { name: 'Ethics' } },
  { id: 'mock-mid-7', title: 'Midterm 7: Logic', exam_type: 'midterm', exam_date: '2024-07-25', total_marks: 40, courses: { name: 'Philosophy 101' }, subjects: { name: 'Logic' } },
  { id: 'mock-final-3', title: 'Final: Modern Poetry', exam_type: 'final', exam_date: '2024-12-05', total_marks: 50, courses: { name: 'English 101' }, subjects: { name: 'Poetry' } },
  { id: 'mock-final-4', title: 'Final: Ancient History', exam_type: 'final', exam_date: '2024-11-20', total_marks: 100, courses: { name: 'History 201' }, subjects: { name: 'Ancient World' } },
  { id: 'mock-final-5', title: 'Final: Data Analysis', exam_type: 'final', exam_date: '2024-11-10', total_marks: 120, courses: { name: 'Math 201' }, subjects: { name: 'Statistics' } },
  { id: 'mock-final-6', title: 'Final: AI Principles', exam_type: 'final', exam_date: '2024-11-01', total_marks: 90, courses: { name: 'CS 301' }, subjects: { name: 'AI' } },
  { id: 'mock-final-7', title: 'Final: Database Theory', exam_type: 'final', exam_date: '2024-10-25', total_marks: 100, courses: { name: 'CS 301' }, subjects: { name: 'Databases' } },
  { id: 'mock-final-8', title: 'Final: Web Design', exam_type: 'final', exam_date: '2024-10-20', total_marks: 75, courses: { name: 'Art 101' }, subjects: { name: 'Design' } },
  { id: 'mock-final-9', title: 'Final: Ethics Seminar', exam_type: 'final', exam_date: '2024-10-15', total_marks: 60, courses: { name: 'Philosophy 101' }, subjects: { name: 'Ethics' } },
  { id: 'mock-quiz-1', title: 'Quiz 1: Set Theory', exam_type: 'quiz', exam_date: '2024-10-01', total_marks: 20, courses: { name: 'Mathematics 101' }, subjects: { name: 'Algebra' } },
  { id: 'mock-quiz-2', title: 'Quiz 2: Limits', exam_type: 'quiz', exam_date: '2024-08-20', total_marks: 30, courses: { name: 'Mathematics 101' }, subjects: { name: 'Calculus' } },
  { id: 'mock-quiz-3', title: 'Quiz 3: Poetry Forms', exam_type: 'quiz', exam_date: '2024-08-10', total_marks: 40, courses: { name: 'Literature 201' }, subjects: { name: 'Poetry' } },
  { id: 'mock-quiz-4', title: 'Quiz 4: Boolean Logic', exam_type: 'quiz', exam_date: '2024-08-01', total_marks: 50, courses: { name: 'Philosophy 101' }, subjects: { name: 'Logic' } },
  { id: 'mock-quiz-5', title: 'Quiz 5: Arrays', exam_type: 'quiz', exam_date: '2024-07-25', total_marks: 25, courses: { name: 'Computer Science 101' }, subjects: { name: 'Data Structures' } },
  { id: 'mock-quiz-6', title: 'Quiz 6: Derivatives', exam_type: 'quiz', exam_date: '2024-07-15', total_marks: 35, courses: { name: 'Mathematics 101' }, subjects: { name: 'Calculus' } },
  { id: 'mock-quiz-7', title: 'Quiz 7: Essay Structure', exam_type: 'quiz', exam_date: '2024-07-05', total_marks: 45, courses: { name: 'Literature 201' }, subjects: { name: 'Poetry' } },
];

const MOCK_COURSES = [
  { id: 'c-1', name: 'Computer Science 101' },
  { id: 'c-2', name: 'Mathematics 101' },
  { id: 'c-3', name: 'Literature 201' },
  { id: 'c-4', name: 'History 201' },
  { id: 'c-5', name: 'Art 101' },
  { id: 'c-6', name: 'Philosophy 101' },
];

const MOCK_SUBJECTS = [
  { id: 's-1', name: 'Data Structures', course_id: 'c-1' },
  { id: 's-2', name: 'Algorithms', course_id: 'c-1' },
  { id: 's-3', name: 'Calculus', course_id: 'c-2' },
  { id: 's-4', name: 'Algebra', course_id: 'c-2' },
  { id: 's-5', name: 'Poetry', course_id: 'c-3' },
  { id: 's-6', name: 'Logic', course_id: 'c-6' },
  { id: 's-7', name: 'Databases', course_id: 'c-1' },
  { id: 's-8', name: 'Ancient World', course_id: 'c-4' },
  { id: 's-9', name: 'Statistics', course_id: 'c-2' },
  { id: 's-10', name: 'AI', course_id: 'c-1' },
  { id: 's-11', name: 'Design', course_id: 'c-5' },
  { id: 's-12', name: 'Ethics', course_id: 'c-6' },
];


const getExamsFromStorage = () => {
    try {
        const storedExams = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedExams) {
            return JSON.parse(storedExams);
        }
    } catch (e) {
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_EXAMS));
    return INITIAL_MOCK_EXAMS;
};

const saveExamsToStorage = (exams: any[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exams));
};


export const ViewAllExamsPage: React.FC = () => {
  const { examType } = useParams<{ examType: 'midterm' | 'final' | 'quiz' }>();
  const navigate = useNavigate();
  const [exams, setExams] = useState<any[]>([]);
  const [filteredExams, setFilteredExams] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    courseId: '',
    subjectId: '',
  });

  useEffect(() => {
    fetchData();
  }, [examType]);

  useEffect(() => {
    applyFilters();
  }, [exams, filters]);

  const fetchData = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    // FIX: Read all exams from local storage instead of the static array
    const allExams = getExamsFromStorage();
    
    const examsData = allExams
      .filter((exam: any) => exam.exam_type === examType)
      .sort((a: any, b: any) => new Date(b.exam_date).getTime() - new Date(a.exam_date).getTime());
    
    const coursesData = MOCK_COURSES;
    const subjectsData = MOCK_SUBJECTS;

    setExams(examsData);
    setCourses(coursesData);
    setSubjects(subjectsData);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...exams];

    if (filters.courseId) {
      filtered = filtered.filter((exam) => exam.course_id === filters.courseId);
    }

    if (filters.subjectId) {
      filtered = filtered.filter((exam) => exam.subject_id === filters.subjectId);
    }

    setFilteredExams(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      const currentExams = getExamsFromStorage();
      const updatedExams = currentExams.filter((exam: any) => exam.id !== id);
      saveExamsToStorage(updatedExams);
      fetchData();
    }
  };

  const handleEdit = (id: string) => {
    setEditingExamId(id);
    setShowForm(true);
  };

  const handleViewExam = (id: string) => {
    navigate(`/exams/${id}`);
  };

  const clearFilters = () => {
    setFilters({ courseId: '', subjectId: '' });
  };

  const availableSubjects = filters.courseId
    ? subjects.filter((s) => s.course_id === filters.courseId)
    : subjects;

  const hasActiveFilters = filters.courseId || filters.subjectId;

  const handleSuccess = () => {
    fetchData();
  };

  return (
    <div className="view-all-exams-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/exams')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">
          All {examType?.toUpperCase()} Exams ({filteredExams.length})
        </h1>
      </div>

      <div className="filters-section">
        <button
          className={`btn-toggle-filters ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <button className="btn-add-exam-top" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Exam
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label htmlFor="course-filter">Filter by Course</label>
            <select
              id="course-filter"
              value={filters.courseId}
              onChange={(e) =>
                setFilters({ ...filters, courseId: e.target.value, subjectId: '' })
              }
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="subject-filter">Filter by Subject</label>
            <select
              id="subject-filter"
              value={filters.subjectId}
              onChange={(e) => setFilters({ ...filters, subjectId: e.target.value })}
              disabled={!filters.courseId}
            >
              <option value="">All Subjects</option>
              {availableSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button className="btn-clear-filters" onClick={clearFilters}>
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading exams...</div>
      ) : filteredExams.length === 0 ? (
        <div className="empty-state">
          <p>
            {hasActiveFilters
              ? 'No exams found matching your filters'
              : `No ${examType} exams found`}
          </p>
          {hasActiveFilters && (
            <button className="btn-clear-filters-empty" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="exams-grid-full">
          {filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onView={handleViewExam}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ExamForm
          examId={editingExamId}
          onClose={() => {
            setShowForm(false);
            setEditingExamId(undefined);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};