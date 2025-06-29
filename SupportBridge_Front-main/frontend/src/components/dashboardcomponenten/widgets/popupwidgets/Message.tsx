// src/popupwidgets/MailPopupMenuContent.tsx
import React from 'react';
import { Inbox, Send, Archive, Trash2 } from 'lucide-react';

const MailPopupMenuContent: React.FC = () => {
  return (
    <div className="simple-popup-content">
      <div className="popup-menu-item">
        <Inbox size={20} />
        <span>Inbox</span>
      </div>
      <div className="popup-menu-item">
        <Send size={20} />
        <span>Sent Mail</span>
      </div>
      <div className="popup-menu-item">
        <Archive size={20} />
        <span>Archived</span>
      </div>
      <div className="popup-menu-item">
        <Trash2 size={20} />
        <span>Trash</span>
      </div>
    </div>
  );
};

export default MailPopupMenuContent;
