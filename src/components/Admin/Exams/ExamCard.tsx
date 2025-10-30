import React from 'react';
import { Calendar, FileText, Trash2, Edit, BookOpen } from 'lucide-react';
import './ExamCard.css';

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    exam_type: string;
    exam_date: string;
    total_marks: number;
    courses?: { name: string };
    subjects?: { name: string };
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onView, onEdit, onDelete }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'midterm':
        return '#3b82f6';
      case 'final':
        return '#ef4444';
      case 'quiz':
        return '#27ac1f';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="exam-card" onClick={() => onView(exam.id)}>
      <div className="exam-card-header">
        <h3 className="exam-card-title">{exam.title}</h3>
        <span
          className="exam-type-badge"
          style={{ backgroundColor: getTypeColor(exam.exam_type) }}
        >
          {exam.exam_type.toUpperCase()}
        </span>
      </div>

      <div className="exam-card-body">
        <div className="exam-detail">
          <FileText size={16} />
          <span>{exam.courses?.name || 'N/A'}</span>
        </div>
        {exam.subjects && (
          <div className="exam-detail">
            <BookOpen size={16} />
            <span>{exam.subjects.name}</span>
          </div>
        )}
        <div className="exam-detail">
          <Calendar size={16} />
          <span>{new Date(exam.exam_date).toLocaleDateString()}</span>
        </div>
        <div className="exam-detail">
          <span className="marks-label">Total Marks:</span>
          <span className="marks-value">{exam.total_marks}</span>
        </div>
      </div>

      <div className="exam-card-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="exam-action-btn edit-btn"
          onClick={() => onEdit(exam.id)}
          title="Edit Exam"
        >
          <Edit size={16} />
        </button>
        <button
          className="exam-action-btn delete-btn"
          onClick={() => onDelete(exam.id)}
          title="Delete Exam"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};