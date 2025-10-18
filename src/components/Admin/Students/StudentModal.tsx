import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Student } from '@/pages/StudentsPage/StudentsPage';
import './StudentModal.css';

interface StudentModalProps {
  student: Student | null;
  onSave: (student: Student | Omit<Student, 'id'>) => void;
  onClose: () => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  student,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    course: 'CSE',
    year: 1,
    status: 'Active' as 'Active' | 'Inactive',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        rollNo: student.rollNo,
        email: student.email,
        course: student.course,
        year: student.year,
        status: student.status,
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      onSave({ ...student, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter student name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNo">Roll Number *</label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              placeholder="E.g., CSE001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="student@edu.in"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="course">Course *</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
