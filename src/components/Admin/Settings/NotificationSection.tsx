import React, { useState } from 'react';

interface NotificationSectionProps {
  onSavePreferences: (data: { email: boolean; sms: boolean; push: boolean }) => void;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({ onSavePreferences }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = () => {
    onSavePreferences({
      email: emailNotifications,
      sms: smsNotifications,
      push: pushNotifications,
    });
  };

  return (
    <div className="settings-card">
      <h3 className="settings-card-title">Notification Preferences</h3>
      <div className="form-group form-group-inline">
        <label htmlFor="email-notifications">Email Notifications</label>
        <input
          type="checkbox"
          id="email-notifications"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
          className="form-switch"
        />
      </div>
      <div className="form-group form-group-inline">
        <label htmlFor="sms-notifications">SMS Notifications</label>
        <input
          type="checkbox"
          id="sms-notifications"
          checked={smsNotifications}
          onChange={(e) => setSmsNotifications(e.target.checked)}
          className="form-switch"
        />
      </div>
      <div className="form-group form-group-inline">
        <label htmlFor="push-notifications">Push Notifications</label>
        <input
          type="checkbox"
          id="push-notifications"
          checked={pushNotifications}
          onChange={(e) => setPushNotifications(e.target.checked)}
          className="form-switch"
        />
      </div>
      <button onClick={handleSave} className="primary-button">
        Save Preferences
      </button>
    </div>
  );
};