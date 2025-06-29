import React, { useEffect, useState } from 'react';
import WidgetBox from '../../buildingwidgets/buildingwidget';
import './GebruikersDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

const GebruikersContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    role: 'Student',
    id: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:500/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
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

  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowPopup(true);
    setOpenMenuId(null);
  };

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.id) {
      alert("Vul alle velden in.");
      return;
    }

    try {
      const response = await fetch('http://localhost:500/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newStudent.name,
          email: newStudent.email,
          id: newStudent.id,
          role: newStudent.role,
        }),
      });

      if (!response.ok) throw new Error('Serverfout bij toevoegen gebruiker.');

      const addedUsers = await response.json();
      if (Array.isArray(addedUsers) && addedUsers.length > 0) {
        setUsers((prev) => [...prev, addedUsers[0]]);
      }

      setShowAddPopup(false);
      setNewStudent({ name: '', email: '', role: 'Student', id: '' });
    } catch (error) {
      console.error("Fout bij toevoegen student:", error);
      alert("Er is iets misgegaan.");
    }
  };

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
          {users.map((user) => (
            <li className="student-item" key={user.id}>
              <div className="avatar"></div>
              <span className="student-id">{user.id}</span>
              <span className="student-name">{user.name}</span>
              <span className="student-role">{user.role}</span>

              <div className="menu-wrapper">
                <span
                  className="menu-toggle"
                  onClick={() =>
                    setOpenMenuId(openMenuId === user.id ? null : user.id)
                  }
                >
                  ⋮
                </span>
                {openMenuId === user.id && (
                  <div className="menu-dropdown">
                    <button onClick={() => handleView(user)}>Bekijk</button>
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
        <div className="status-number">{users.length}</div>
        <p className="status-subtext">total Students</p>
      </WidgetBox>

      <WidgetBox className="idk">
        <h3 className="student-title">Nieuwe Studenten</h3>
        <div className="adding-student" onClick={() => setShowAddPopup(true)}>
          <FontAwesomeIcon icon={faPlus} className="adding-icon" />
        </div>
        <div className="divider">
          <div className="line" />
          <span>Vandaag</span>
          <div className="line" />
        </div>

        <div className="scroll-area">
          {users.length > 0 && (
            <div className="student-card">
              <div className="student-header">
                <div className="avatar-small"></div>
                <div className="student-info">
                  <div className="name">{users[users.length - 1].name}</div>
                  <div className="role">Rol: {users[users.length - 1].role}</div>
                </div>
              </div>
              <div className="message-footer">
                <div className="bubble">{new Date().toLocaleString()}</div>
              </div>
            </div>
          )}

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

      {showAddPopup && (
        <div className="popup-overlay" onClick={() => setShowAddPopup(false)}>
          <div className="add-student-form" onClick={(e) => e.stopPropagation()}>
            <h3>Nieuwe Student Toevoegen</h3>
            <input
              type="text"
              placeholder="Naam"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID"
              value={newStudent.id}
              onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
            />
            <select
              value={newStudent.role}
              onChange={(e) => setNewStudent({ ...newStudent, role: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Leraar">Leraar</option>
            </select>

            <button onClick={handleAddStudent}>Toevoegen</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GebruikersContent;