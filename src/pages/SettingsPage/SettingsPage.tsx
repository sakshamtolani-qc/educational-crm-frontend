import React from 'react';
import { ProfileSection } from '@/components/Admin/Settings/ProfileSection';
import { SecuritySection } from '@/components/Admin/Settings/SecuritySection';
import { NotificationSection } from '@/components/Admin/Settings/NotificationSection'; 
import './SettingsPage.css'; 
import '@/components/Admin/Settings/SettingsPage.css'; 

interface SettingsPageProps {
  sidebarOpen: boolean; 
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = () => {

  const handleProfileUpdate = (data: { name: string; email: string; contact: string }) => {
    console.log('Updating profile:', data);
    // Integrate with API: /api/users/{id} (PUT)
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (data: { current: string; new: string; confirm: string }) => {
    console.log('Changing password:', data);
    // Integrate with API for password change
    alert('Password change request sent!');
  };

  const handleNotificationSave = (data: { email: boolean; sms: boolean; push: boolean }) => {
    console.log('Saving notification preferences:', data);
    // Integrate with API for notifications
    alert('Notification preferences saved!');
  };

  return (
    <div className="settings-page">
      <h1 className="settings-main-title">Settings</h1>
      <div className="settings-grid">
        <ProfileSection onUpdate={handleProfileUpdate} />
        <SecuritySection onChangePassword={handlePasswordChange} />
        <NotificationSection onSavePreferences={handleNotificationSave} /> {/* Optional section */}
      </div>
    </div>
  );
};