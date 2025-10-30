import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, FileText, Plus, TrendingUp, Users, BookOpen } from 'lucide-react';
import { ResultList } from './ResultList';
import { ResultForm } from './ResultForm';
import './ExamDetails.css';

interface ExamDetailsProps {
  examId: string;
  onBack: () => void;
}

const MOCK_EXAM = {
  id: 'mock-exam-1',
  title: 'Midterm Exam - Q3 2024',
  exam_type: 'midterm',
  exam_date: '2024-10-25',
  total_marks: 100,
  course_id: 'c-1',
  subject_id: 's-1',
  courses: { name: 'Computer Science 101' },
  subjects: { name: 'Data Structures' },
};

const MOCK_RESULTS = [
  { id: 'r-1', exam_id: 'mock-exam-1', student_id: 'st-1', marks_obtained: 85, students: { student_id: 'S001', name: 'Alice Johnson' } },
  { id: 'r-2', exam_id: 'mock-exam-1', student_id: 'st-2', marks_obtained: 92, students: { student_id: 'S002', name: 'Bob Smith' } },
  { id: 'r-3', exam_id: 'mock-exam-1', student_id: 'st-3', marks_obtained: 77, students: { student_id: 'S003', name: 'Charlie Brown' } },
  { id: 'r-4', exam_id: 'mock-exam-1', student_id: 'st-4', marks_obtained: 45, students: { student_id: 'S004', name: 'Diana Prince' } },
  { id: 'r-5', exam_id: 'mock-exam-1', student_id: 'st-5', marks_obtained: 68, students: { student_id: 'S005', name: 'Ethan Hunt' } },
];

export const ExamDetails: React.FC<ExamDetailsProps> = ({ examId, onBack }) => {
  const [exam, setExam] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [showResultForm, setShowResultForm] = useState(false);
  const [editingResultId, setEditingResultId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExamDetails();
    fetchResults();
  }, []);

  const fetchExamDetails = async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    setExam(MOCK_EXAM);
    setLoading(false);
  };

  const fetchResults = async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    setResults(MOCK_RESULTS);
  };

  const calculateStatistics = () => {
    if (results.length === 0) return null;

    const marks = results.map((r) => Number(r.marks_obtained));
    const total = exam?.total_marks || 100; 

    const average = marks.reduce((a, b) => a + b, 0) / marks.length;
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    const passCount = marks.filter((m) => (m / total) * 100 >= 50).length;
    const passRate = (passCount / results.length) * 100;

    return {
      average: average.toFixed(2),
      highest,
      lowest,
      totalStudents: results.length,
      passRate: passRate.toFixed(2),
    };
  };

  const handleEditResult = (resultId: string) => {
    setEditingResultId(resultId);
    setShowResultForm(true);
  };

  const handleCloseForm = () => {
    setShowResultForm(false);
    setEditingResultId(undefined);
  };

  const handleSuccess = () => {
    fetchResults();
  };

  const statistics = calculateStatistics();

  if (loading) return <div className="loading-state">Loading exam details...</div>;
  if (!exam) return <div className="empty-state">Exam not found</div>;

  return (
    <div className="exam-details-container">
      <div className="exam-details-header">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Exams
        </button>

        <h1 className="exam-title">{exam.title}</h1>
        <span
          className="exam-type-badge-large"
          style={{
            backgroundColor:
              exam.exam_type === 'midterm'
                ? '#3b82f6'
                : exam.exam_type === 'final'
                ? '#ef4444'
                : '#27ac1f',
          }}
        >
          {exam.exam_type.toUpperCase()}
        </span>
      </div>

      <div className="exam-info-section">
        <div className="info-card">
          <FileText size={20} />
          <div>
            <div className="info-label">Course</div>
            <div className="info-value">{exam.courses?.name}</div>
          </div>
        </div>
        {exam.subjects && (
          <div className="info-card">
            <BookOpen size={20} />
            <div>
              <div className="info-label">Subject</div>
              <div className="info-value">{exam.subjects.name}</div>
            </div>
          </div>
        )}
        <div className="info-card">
          <Calendar size={20} />
          <div>
            <div className="info-label">Exam Date</div>
            <div className="info-value">
              {new Date(exam.exam_date).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="info-card">
          <FileText size={20} />
          <div>
            <div className="info-label">Total Marks</div>
            <div className="info-value">{exam.total_marks}</div>
          </div>
        </div>
      </div>

      {statistics && (
        <div className="statistics-section">
          <h2 className="section-title">Performance Statistics</h2>
          <div className="statistics-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#dbeafe' }}>
                <TrendingUp size={24} style={{ color: '#3b82f6' }} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Average Marks</div>
                <div className="stat-value">{statistics.average}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#d1fae5' }}>
                <TrendingUp size={24} style={{ color: '#10b981' }} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Highest Marks</div>
                <div className="stat-value">{statistics.highest}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fee2e2' }}>
                <TrendingUp size={24} style={{ color: '#ef4444' }} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Lowest Marks</div>
                <div className="stat-value">{statistics.lowest}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e0e7ff' }}>
                <Users size={24} style={{ color: '#6366f1' }} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Students</div>
                <div className="stat-value">{statistics.totalStudents}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7' }}>
                <TrendingUp size={24} style={{ color: '#f59e0b' }} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Pass Rate</div>
                <div className="stat-value">{statistics.passRate}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="results-section">
        <div className="results-header">
          <h2 className="section-title">Student Results</h2>
          <button className="btn-add-result" onClick={() => setShowResultForm(true)}>
            <Plus size={18} />
            Add Result
          </button>
        </div>
        <ResultList examId={examId} onEdit={handleEditResult} />
      </div>

      {showResultForm && (
        <ResultForm
          examId={examId}
          resultId={editingResultId}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};