import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamCard } from './ExamCard';
import { ExamForm } from './ExamForm';
import './ExamList.css';

interface ExamListProps {
  examType: 'midterm' | 'final' | 'quiz';
  onViewExam: (id: string) => void;
}

const CARDS_PER_PAGE = 6;
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


export const ExamList: React.FC<ExamListProps> = ({ examType, onViewExam }) => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | undefined>();

  useEffect(() => {
    fetchExams();
  }, [examType]);

  const fetchExams = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));

    const allExams = getExamsFromStorage();

    const filteredAndSorted = allExams
      .filter((exam: any) => exam.exam_type === examType)
      .sort((a: any, b: any) => new Date(b.exam_date).getTime() - new Date(a.exam_date).getTime());
    
    setExams(filteredAndSorted);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      const currentExams = getExamsFromStorage();
      const updatedExams = currentExams.filter((exam: any) => exam.id !== id);
      saveExamsToStorage(updatedExams);
      fetchExams();
    }
  };

  const handleEdit = (id: string) => {
    setEditingExamId(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExamId(undefined);
  };

  const handleSuccess = (newExamData?: any) => {
    const currentExams = getExamsFromStorage();
    
    if (newExamData && !editingExamId) {
      const newExam = {
        ...newExamData,
        id: `mock-${newExamData.exam_type}-${Date.now()}`,
        courses: { name: 'Simulated Course' },
        subjects: { name: 'Simulated Subject' },
      };
      currentExams.push(newExam);
    } 

    saveExamsToStorage(currentExams);
    fetchExams();
  };

  const handleViewAll = () => {
    navigate(`view-all/${examType}`);
  };

  const displayedExams = exams.slice(0, CARDS_PER_PAGE);
  const hasMore = exams.length > CARDS_PER_PAGE;

  return (
    <div className="exam-list-container">
      <div className="exam-list-header">
        <h2 className="exam-list-title">{examType.toUpperCase()} Exams</h2>
        <button className="btn-add-exam" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Exam
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading exams...</div>
      ) : exams.length === 0 ? (
        <div className="empty-state">
          <p>No {examType} exams found</p>
          <button className="btn-add-first" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Add First Exam
          </button>
        </div>
      ) : (
        <>
          <div className="exam-grid">
            {displayedExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onView={onViewExam}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {hasMore && (
            <div className="view-all-container">
              <button className="btn-view-all" onClick={handleViewAll}>
                View All {exams.length} {examType} Exams
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {showForm && (
        <ExamForm
          examId={editingExamId}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};