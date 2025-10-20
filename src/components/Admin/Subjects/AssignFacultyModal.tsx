import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Subject, Faculty } from '@/pages/SubjectsPage/SubjectsPage';
import { FacultySelectList } from './FacultySelectList';
import './AssignFacultyModal.css';

interface AssignFacultyModalProps {
  subject: Subject;
  faculties: Faculty[];
  onConfirm: (facultyId: number) => void;
  onClose: () => void;
}

export const AssignFacultyModal: React.FC<AssignFacultyModalProps> = ({
  subject,
  faculties,
  onConfirm,
  onClose,
}) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(
    subject.facultyId || null
  );

  const handleConfirm = () => {
    if (selectedFacultyId) {
      onConfirm(selectedFacultyId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="assign-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="assign-modal-header">
          <div>
            <h2>Assign Faculty</h2>
            <p className="subject-info">
              Subject: <strong>{subject.name}</strong> ({subject.code})
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="assign-modal-body">
          <FacultySelectList
            faculties={faculties}
            selectedFacultyId={selectedFacultyId}
            onSelect={setSelectedFacultyId}
          />
        </div>

        <div className="assign-modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={!selectedFacultyId}
          >
            Assign Faculty
          </button>
        </div>
      </div>
    </div>
  );
};
