import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ResultForm.css';

interface ResultFormProps {
  examId: string;
  resultId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const MOCK_STUDENTS = [
  { id: 'st-1', student_id: 'S001', name: 'Alice Johnson' },
  { id: 'st-2', student_id: 'S002', name: 'Bob Smith' },
  { id: 'st-3', student_id: 'S003', name: 'Charlie Brown' },
  { id: 'st-4', student_id: 'S004', name: 'Diana Prince' },
];

const MOCK_EXAM_FOR_RESULT = {
    id: 'mock-exam-1',
    title: 'Midterm Exam - Q3 2024',
    total_marks: 100,
    courses: { name: 'Computer Science 101' },
};

const MOCK_EDIT_RESULT = {
    id: 'mock-edit-result',
    exam_id: 'mock-exam-1',
    student_id: 'st-2',
    marks_obtained: 95,
};

export const ResultForm: React.FC<ResultFormProps> = ({ examId, resultId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [exam, setExam] = useState<any>(null);
  const [formData, setFormData] = useState({
    student_id: '',
    marks_obtained: 0,
  });

  useEffect(() => {
    fetchExam();
    fetchStudents();
    if (resultId) {
      fetchResult();
    }
  }, [examId, resultId]);

  const fetchExam = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setExam(MOCK_EXAM_FOR_RESULT);
  };

  const fetchStudents = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setStudents(MOCK_STUDENTS);
  };

  const fetchResult = async () => {
    if (!resultId) return;
    await new Promise(resolve => setTimeout(resolve, 300));

    if (resultId === MOCK_EDIT_RESULT.id) {
        setFormData({
            student_id: MOCK_EDIT_RESULT.student_id,
            marks_obtained: MOCK_EDIT_RESULT.marks_obtained,
        });
    } else {
        setFormData({
            student_id: 'st-1',
            marks_obtained: 80,
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      const resultData = {
        exam_id: examId,
        student_id: formData.student_id,
        marks_obtained: formData.marks_obtained,
      };

      if (resultId) {
      } else {
      }
      onSuccess();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const selectedStudent = students.find((s) => s.id === formData.student_id);

  return (
    <div className="modal-overlay">
      <div className="modal-content result-form-modal">
        <div className="modal-header">
          <h2>{resultId ? 'Edit Result' : 'Add Result'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="result-form">
          {exam && (
            <div className="exam-info-card">
              <div className="info-row">
                <span className="info-label">Course:</span>
                <span className="info-value">{exam.courses?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Exam:</span>
                <span className="info-value">{exam.title}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Marks:</span>
                <span className="info-value">{exam.total_marks}</span>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="student_id">Student</label>
            <select
              id="student_id"
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              required
              disabled={!!resultId}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.student_id} - {student.name}
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div className="student-info-card">
              <div className="info-row">
                <span className="info-label">Student ID:</span>
                <span className="info-value">{selectedStudent.student_id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Student Name:</span>
                <span className="info-value">{selectedStudent.name}</span>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="marks_obtained">Marks Obtained</label>
            <input
              id="marks_obtained"
              type="number"
              value={formData.marks_obtained}
              onChange={(e) => setFormData({ ...formData, marks_obtained: Number(e.target.value) })}
              min="0"
              max={exam?.total_marks || 100}
              step="0.01"
              required
            />
            {exam && (
              <span className="marks-hint">Maximum: {exam.total_marks} marks</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : resultId ? 'Update Result' : 'Add Result'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};