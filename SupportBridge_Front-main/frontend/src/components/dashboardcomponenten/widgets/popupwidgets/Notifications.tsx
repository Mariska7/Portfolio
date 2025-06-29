// src/popupwidgets/BellPopupMenuContent.tsx
import React from 'react';
import { BellRing, CheckCircle, XCircle } from 'lucide-react';

const BellPopupMenuContent: React.FC = () => {
  return (
    <div className="simple-popup-content">
      <div className="popup-menu-item">
        <BellRing size={20} />
        <span>View All Notifications</span>
      </div>
      <div className="popup-menu-item">
        <CheckCircle size={20} />
        <span>Mark All Read</span>
      </div>
      <div className="popup-menu-item">
        <XCircle size={20} />
        <span>Clear All</span>
      </div>
      <div className="popup-menu-divider" />
      <p className="popup-menu-item" style={{ cursor: 'default', color: '#888' }}>No new notifications</p>
    </div>
  );
};

export default BellPopupMenuContent;
