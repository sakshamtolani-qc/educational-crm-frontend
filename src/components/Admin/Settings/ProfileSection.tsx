import React, { useState } from 'react';

interface ProfileSectionProps {
  onUpdate: (data: { name: string; email: string; contact: string }) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onUpdate }) => {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin.user@example.com');
  const [contact, setContact] = useState('+1234567890');

  const handleUpdate = () => {
    onUpdate({ name, email, contact });
  };

  return (
    <div className="settings-card">
      <h3 className="settings-card-title">Profile Information</h3>
      <div className="form-group">
        <label htmlFor="profile-name">Full Name</label>
        <input
          type="text"
          id="profile-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-email">Email Address</label>
        <input
          type="email"
          id="profile-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-contact">Contact Number</label>
        <input
          type="text"
          id="profile-contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="form-input"
        />
      </div>
      <button onClick={handleUpdate} className="primary-button">
        Update Profile
      </button>
    </div>
  );
};