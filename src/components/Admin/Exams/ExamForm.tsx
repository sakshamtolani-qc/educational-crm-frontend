import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ExamForm.css';

interface ExamFormProps {
  examId?: string;
  // Change onSuccess signature to accept new data
  onSuccess: (newExamData?: any) => void; 
  onClose: () => void;
}

const MOCK_COURSES = [
  { id: 'c-1', name: 'Computer Science 101' },
  { id: 'c-2', name: 'Mathematics 101' },
  { id: 'c-3', name: 'Literature 201' },
];

const MOCK_SUBJECTS_C1 = [
  { id: 's-1', name: 'Data Structures' },
  { id: 's-2', name: 'Algorithms' },
];

const MOCK_SUBJECTS_C2 = [
  { id: 's-3', name: 'Calculus' },
  { id: 's-4', name: 'Algebra' },
];

const MOCK_EDIT_EXAM = {
  id: 'mock-edit-1',
  course_id: 'c-2',
  subject_id: 's-4',
  title: 'Calculus Midterm Retake',
  exam_type: 'midterm',
  exam_date: '2024-11-01',
  total_marks: 100,
};

export const ExamForm: React.FC<ExamFormProps> = ({ examId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    course_id: '',
    subject_id: '',
    title: '',
    exam_type: 'midterm',
    exam_date: '',
    total_marks: 100,
  });

  useEffect(() => {
    fetchCourses();
    if (examId) {
      fetchExam();
    }
  }, [examId]);

  useEffect(() => {
    if (formData.course_id) {
      fetchSubjects(formData.course_id);
    } else {
      setSubjects([]);
      setFormData((prev) => ({ ...prev, subject_id: '' }));
    }
  }, [formData.course_id]);

  const fetchCourses = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setCourses(MOCK_COURSES);
  };

  const fetchSubjects = async (courseId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockSubjects = courseId === 'c-1' ? MOCK_SUBJECTS_C1 : courseId === 'c-2' ? MOCK_SUBJECTS_C2 : [];
    setSubjects(mockSubjects);
  };

  const fetchExam = async () => {
    if (!examId) return;
    await new Promise(resolve => setTimeout(resolve, 300));

    if (examId === MOCK_EDIT_EXAM.id) {
        setFormData({
            course_id: MOCK_EDIT_EXAM.course_id,
            subject_id: MOCK_EDIT_EXAM.subject_id,
            title: MOCK_EDIT_EXAM.title,
            exam_type: MOCK_EDIT_EXAM.exam_type,
            exam_date: MOCK_EDIT_EXAM.exam_date,
            total_marks: MOCK_EDIT_EXAM.total_marks,
        });
    } else {
        setFormData({
            course_id: 'c-1',
            subject_id: 's-1',
            title: 'Mock Exam for Editing',
            exam_type: 'final',
            exam_date: '2024-11-30',
            total_marks: 150,
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      if (examId) {
        // Update logic (refresh list only)
        onSuccess();
      } else {
        // Creation logic (pass new data to trigger mock update and refresh)
        onSuccess(formData);
      }
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content exam-form-modal">
        <div className="modal-header">
          <h2>{examId ? 'Edit Exam' : 'Create New Exam'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="exam-form">
          <div className="form-group">
            <label htmlFor="course_id">Course</label>
            <select
              id="course_id"
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value, subject_id: '' })}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject_id">Subject</label>
            <select
              id="subject_id"
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
              disabled={!formData.course_id || subjects.length === 0}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Exam Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter exam title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exam_type">Exam Type</label>
            <select
              id="exam_type"
              value={formData.exam_type}
              onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
              required
            >
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exam_date">Exam Date</label>
            <input
              id="exam_date"
              type="date"
              value={formData.exam_date}
              onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_marks">Total Marks</label>
            <input
              id="total_marks"
              type="number"
              value={formData.total_marks}
              onChange={(e) => setFormData({ ...formData, total_marks: Number(e.target.value) })}
              min="1"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : examId ? 'Update Exam' : 'Create Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};