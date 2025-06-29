import React, { useEffect, useState } from 'react';
import WidgetBox from '../../../dashboardcomponenten/widgets/buildingwidgets/buildingwidget';
import './GebruikersDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Ticket {
  id: number;
  Name: string;
  StudNr: number;
  Email: string;
}

interface Student {
  id: string;
  name: string;
  role: string;
  email: string;
}

const GebruikersContent: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:500/api/ticket');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
   
      if (!target.closest('.menu-toggle') && !target.closest('.menu-dropdown')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleView = (student: Student) => {
    setSelectedUser(student);
    setShowPopup(true);
    setOpenMenuId(null);
  };

  const studentData: Student[] = [
    { id: '001', name: 'Alice', role: 'Student', email: 'alice@school.nl' },
    { id: '002', name: 'Bob', role: 'Leraar', email: 'bob@school.nl' },
    { id: '003', name: 'Charlie', role: 'Student', email: 'charlie@school.nl' },
  ];

  return (
    <div className="Gebruiker-widgets">
      <WidgetBox className="StudentenList">
        <div className="student-subheader">
          <span></span>
          <span>ID</span>
          <span>Naam</span>
          <span>Rol</span>
          <span>Meer</span>
        </div>

        <ul className="student-list">
          {studentData.map((student) => (
            <li className="student-item" key={student.id}>
              <div className="avatar"></div>
              <span className="student-id">{student.id}</span>
              <span className="student-name">{student.name}</span>
              <span className="student-role">{student.role}</span>

              <div className="menu-wrapper">
                <span
                  className="menu-toggle"
                  onClick={() =>
                    setOpenMenuId(openMenuId === student.id ? null : student.id)
                  }
                >
                  ⋮
                </span>
                {openMenuId === student.id && (
                  <div className="menu-dropdown">
                    <button onClick={() => handleView(student)}>Bekijk</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </WidgetBox>

      <WidgetBox className="Statuswidget image-section">
        <div className="status-title">
          <span>Aantal</span>
          <span>studenten</span>
        </div>
        <div className="status-number">{tickets.length}</div>
        <p className="status-subtext">total Students</p>
      </WidgetBox>

      <WidgetBox className="idk">
        <h3 className="student-title">Nieuwe Studenten</h3>
          <div className='adding-student'>
            <FontAwesomeIcon icon={faPlus} className='adding-icon' />
          </div>
        <div className="divider">
          <div className="line" />
          <span>Vandaag</span>
          <div className="line" />
        </div>

  <div className="scroll-area">

    <div className="student-card">
      <div className="student-header">
        <div className="avatar-small"></div>
        <div className="student-info">
          <div className="name">
            {tickets.length > 0 ? tickets[tickets.length - 1].Name : 'Geen naam'}
          </div>
          <div className="role">Rol: Student</div>
        </div>
      </div>
      <div className="message-footer">
        <div className="bubble">{new Date().toLocaleString()}</div>
      </div>
    </div>
    {[
      { name: 'Jan Jansen', time: '10-6-2025 09:50', role: 'Student' },
      { name: 'Sara de Vries', time: '10-6-2025 09:45', role: 'Student' },
      { name: 'Ali Mahmoud', time: '10-6-2025 09:40', role: 'Student' },
      { name: 'Emma Bakker', time: '10-6-2025 09:35', role: 'Student' },
      { name: 'Tom Peters', time: '10-6-2025 09:30', role: 'Student' }
    ].map((student, index) => (
      <div className="student-card" key={index}>
        <div className="student-header">
          <div className="avatar-small"></div>
          <div className="student-info">
            <div className="name">{student.name}</div>
            <div className="role">Rol: {student.role}</div>
          </div>
        </div>
        <div className="message-footer">
          <div className="bubble">{student.time}</div>
        </div>
      </div>
    ))}
  </div>
</WidgetBox>

{showPopup && selectedUser && (
  <div className="popup-overlay" onClick={() => setShowPopup(false)}>
    <div className="mini-profile-card" onClick={(e) => e.stopPropagation()}>
      <div className="avatar-section">
        <div className="mini-avatar"></div>
      </div>

      <div className="info-section">
        <div className="info-top">
          <div className="name">{selectedUser.name}</div>
          <div className="role">{selectedUser.role}</div>
        </div>
        <div className="info-bottom">
          <span className="email-icon">📧</span>
          <span className="email-text">{selectedUser.email}</span>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default GebruikersContent;
