// src/popupwidgets/UserPopupMenuContent.tsx
import React from 'react';
import { UserCircle, Settings, LogOut, HelpCircle, Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons

interface UserPopupMenuContentProps {
  userName: string;
  userEmail: string;
  currentTheme: 'light' | 'dark'; // Add theme prop
  onToggleTheme: () => void; // Add toggle function prop
}

const UserPopupMenuContent: React.FC<UserPopupMenuContentProps> = ({ userName, userEmail, currentTheme, onToggleTheme }) => {
  return (
    <div className="user-popup-menu-content"> {/* Add a class for styling the popup itself */}
      <div className="user-popup-header">
        <div className="avatar">
          <UserCircle size={48} />
        </div>
        <div className="info">
          <h3>{userName}</h3>
          <p>{userEmail}</p>
        </div>
      </div>

      <div className="popup-menu-item">
        <UserCircle size={20} />
        <span>Your Channel</span>
      </div>
      
      {/* Theme Switch Section */}
      <div className="popup-menu-item theme-switch-item" onClick={onToggleTheme}>
        {currentTheme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
        <span>Theme: {currentTheme === 'light' ? 'Light' : 'Dark'}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={currentTheme === 'dark'} // Checkbox is checked if theme is 'dark'
            onChange={onToggleTheme} // Toggle theme when checkbox is clicked
            aria-label="Toggle dark mode"
          />
          <span className="slider round"></span>
        </label>
      </div>
      {/* End Theme Switch Section */}

      <div className="popup-menu-item">
        <Settings size={20} />
        <span>Settings</span>
      </div>
      <div className="popup-menu-divider" />
      <div className="popup-menu-item">
        <HelpCircle size={20} />
        <span>Help & Feedback</span>
      </div>
      <div className="popup-menu-item">
        <LogOut size={20} />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default UserPopupMenuContent;