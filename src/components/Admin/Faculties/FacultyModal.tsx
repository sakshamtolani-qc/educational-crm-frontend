import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Faculty } from '@/pages/FacultiesPage/FacultiesPage';
import './FacultyModal.css';

interface FacultyModalProps {
  faculty: Faculty | null;
  onSave: (faculty: Faculty | Omit<Faculty, 'id'>) => void;
  onClose: () => void;
}

export const FacultyModal: React.FC<FacultyModalProps> = ({
  faculty,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    specialization: '',
    designation: '',
    hire_date: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    if (faculty) {
      setFormData({
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        specialization: faculty.specialization,
        designation: faculty.designation,
        hire_date: faculty.hire_date,
        status: faculty.status,
      });
    } else {
        setFormData({
            name: '',
            email: '',
            department: 'Computer Science',
            specialization: '',
            designation: '',
            hire_date: new Date().toISOString().substring(0, 10),
            status: 'active',
        });
    }
  }, [faculty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faculty) {
      onSave({ ...faculty, ...formData });
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
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{faculty ? 'Edit Faculty' : 'Add New Faculty'}</h2>
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
              placeholder="Enter faculty name"
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
              placeholder="faculty@university.edu"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input 
                type="text" 
                id="specialization"
                name="specialization" 
                value={formData.specialization} 
                onChange={handleChange} 
                placeholder="e.g., AI, Statistics"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input 
                type="text" 
                id="designation"
                name="designation" 
                value={formData.designation} 
                onChange={handleChange} 
                placeholder="e.g., Professor, Lecturer"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="hire_date">Hire Date *</label>
              <input 
                type="date" 
                id="hire_date"
                name="hire_date" 
                value={formData.hire_date} 
                onChange={handleChange} 
                required
              />
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {faculty ? 'Update Faculty' : 'Add Faculty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};