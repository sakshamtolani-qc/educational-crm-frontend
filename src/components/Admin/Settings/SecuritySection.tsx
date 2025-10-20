import React, { useState } from 'react';

interface SecuritySectionProps {
  onChangePassword: (data: { current: string; new: string; confirm: string }) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    onChangePassword({ current: currentPassword, new: newPassword, confirm: confirmPassword });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password change initiated (check console for values)');
  };

  return (
    <div className="settings-card">
      <h3 className="settings-card-title">Security</h3>
      <div className="form-group">
        <label htmlFor="current-password">Current Password</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button onClick={handleChangePassword} className="primary-button">
        Change Password
      </button>
    </div>
  );
};