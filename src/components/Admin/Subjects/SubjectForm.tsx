import React, { useState, useEffect } from 'react';
import { Subject, Course } from '@/pages/SubjectsPage/SubjectsPage';
import './SubjectForm.css';

interface SubjectFormProps {
  subject: Subject | null;
  courses: Course[];
  onSubmit: (data: Partial<Subject>) => void;
  onCancel: () => void;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({
  subject,
  courses,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 3,
    courseId: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        code: subject.code,
        credits: subject.credits,
        courseId: subject.courseId,
      });
    }
  }, [subject]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Subject code is required';
    }

    if (formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = 'Credits must be between 1 and 10';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'credits' || name === 'courseId' ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Subject Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Enter subject name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="code" className="form-label">
          Subject Code <span className="required">*</span>
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className={`form-input ${errors.code ? 'error' : ''}`}
          placeholder="e.g., CS101"
        />
        {errors.code && <span className="error-message">{errors.code}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="credits" className="form-label">
          Credits <span className="required">*</span>
        </label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          className={`form-input ${errors.credits ? 'error' : ''}`}
          min="1"
          max="10"
        />
        {errors.credits && <span className="error-message">{errors.credits}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="courseId" className="form-label">
          Course <span className="required">*</span>
        </label>
        <select
          id="courseId"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className={`form-select ${errors.courseId ? 'error' : ''}`}
        >
          <option value="0">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.courseId && <span className="error-message">{errors.courseId}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {subject ? 'Update Subject' : 'Add Subject'}
        </button>
      </div>
    </form>
  );
};
