import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Course } from '@/pages/CoursesPage/CoursesPage';
import './CourseModal.css';

interface CourseModalProps {
  course: Course | null;
  onSave: (course: Course | Omit<Course, 'id'>) => void;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    credits: 180,
    duration: 48,
  });

  const [errors, setErrors] = useState({
    name: '',
    code: '',
    description: '',
    credits: '',
    duration: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        description: course.description,
        credits: course.credits,
        duration: course.duration,
      });
    } else {
      setFormData({
        name: '',
        code: '',
        description: '',
        credits: 3,
        duration: 4,
      });
    }
  }, [course]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      code: '',
      description: '',
      credits: '',
      duration: '',
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
      isValid = false;
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (formData.credits < 1 || formData.credits > 300) {
      newErrors.credits = 'Credits must be between 1 and 300';
      isValid = false;
    }

    if (formData.duration < 1 || formData.duration > 60) {
      newErrors.duration = 'Duration must be between 1 and 60 months';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (course) {
      onSave({ ...course, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'credits' || name === 'duration') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Course Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter course name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="code">Course Code *</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., CS101"
              className={errors.code ? 'error' : ''}
            />
            {errors.code && <span className="error-message">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the course"
              rows={3}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="credits">Credits *</label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                min="1"
                max="300"
                placeholder="e.g., 3"
                className={errors.credits ? 'error' : ''}
              />
              {errors.credits && <span className="error-message">{errors.credits}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (Months) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="60"
                placeholder="e.g., 4"
                className={errors.duration ? 'error' : ''}
              />
              {errors.duration && <span className="error-message">{errors.duration}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
