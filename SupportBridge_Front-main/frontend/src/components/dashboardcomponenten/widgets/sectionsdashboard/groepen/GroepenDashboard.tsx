import React, { useEffect, useState, useRef } from 'react';
import WidgetBox from '../../buildingwidgets/buildingwidget';
import './GroepenDashboard.css';

interface Ticket {
  id: number;
  Name: string;
  Age: number;
  Email: string;
  Question: string;
  Subject: string;
  Time: string;
}

const TicketsContent: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<'opentickets' | 'activity'>('opentickets');
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const ticketListRef = useRef<HTMLUListElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!contentRef.current) return;
    
    e.preventDefault();
    
    const scrollAmount = e.deltaY * 0.5;
    contentRef.current.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  // 确保票务列表内容不足时也能滚动外部容器
  useEffect(() => {
    const checkScroll = () => {
      if (ticketListRef.current && contentRef.current) {
        const listHeight = ticketListRef.current.scrollHeight;
        const containerHeight = contentRef.current.clientHeight;
        
        if (listHeight < containerHeight) {
          ticketListRef.current.style.overflowY = 'hidden';
        } else {
          ticketListRef.current.style.overflowY = 'auto';
        }
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tickets, activeTab]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:500/api/ticket');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="page-widgets">
      <div className="sidebar">
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'opentickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('opentickets')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9L15,3M19,19H5V5H14V10H19V19M17,14H7V12H17V14M14,16H7V14H14V16Z" />
            </svg>
            <span className="tab-text">Open Tickets</span>
            {tickets.length > 0 && (
              <span className="tab-badge">{tickets.length}</span>
            )}
          </button>
          
          <button
            className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
            </svg>
            <span className="tab-text">Laatste Activiteit</span>
          </button>
        </div>
      </div>

      <div 
        className="content"
        ref={contentRef}
        onWheel={handleWheel}
      >
        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading tickets...</p>
          </div>
        ) : (
          <>
            {activeTab === 'opentickets' && (
              <WidgetBox className="Opentickets">
                <div className="ticket-header">
                  <span>Naam</span>
                  <span>Onderwerp</span>
                  <span>Vraag</span>
                </div>

                <ul className="ticket-list" ref={ticketListRef}>
                  {tickets.map(ticket => (
                    <li key={ticket.id} className="ticket-item">
                      <div className="ticket-info">
                        <h4 className="ticket-subject">{ticket.Subject}</h4>
                        <p className="ticket-name">{ticket.Name}</p>
                        <p className="ticket-question">{ticket.Question}</p>
                      </div>
                      <div className="ticket-time">
                        {new Date(ticket.Time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </WidgetBox>
            )}

            {activeTab === 'activity' && (
              <WidgetBox className="Opentickets LaatsteActiviteit">
                <div className="ticket-header">
                  <span>Naam</span>
                  <span>Onderwerp</span>
                  <span>Vraag</span>
                </div>

                {tickets.length > 0 && (
                  <ul className="ticket-list" ref={ticketListRef}>
                    <li className="ticket-item">
                      <div className="ticket-info">
                        <h4 className="ticket-subject">{tickets[tickets.length - 1].Subject}</h4>
                        <p className="ticket-name">{tickets[tickets.length - 1].Name}</p>
                        <p className="ticket-question">{tickets[tickets.length - 1].Question}</p>
                      </div>
                      <div className="ticket-time">
                        {new Date(tickets[tickets.length - 1].Time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </li>
                  </ul>
                )}
              </WidgetBox>
            )}
          </>
        )}
      </div>

      <div className="ticket-status-panel">
        <WidgetBox className="TicketStatusBoxPro">
          <div className="ticket-status-header">
            <div className="ticket-status-icon-wrapper">
              <svg className="ticket-status-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5,12C15.5,10.62 14.38,9.5 13,9.5C11.62,9.5 10.5,10.62 10.5,12C10.5,13.38 11.62,14.5 13,14.5C14.38,14.5 15.5,13.38 15.5,12M22,12C22,14.28 21.44,16.26 20.33,17.67C18.93,19.56 16.9,20 13,20H11C7.1,20 5.07,19.56 3.67,17.67C2.56,16.26 2,14.28 2,12C2,9.72 2.56,7.73 3.67,6.33C5.07,4.44 7.1,4 11,4H13C16.9,4 18.93,4.44 20.33,6.33C21.44,7.74 22,9.72 22,12M7.5,12C7.5,13.38 8.62,14.5 10,14.5C11.38,14.5 12.5,13.38 12.5,12C12.5,10.62 11.38,9.5 10,9.5C8.62,9.5 7.5,10.62 7.5,12Z" />
              </svg>
            </div>
            <h3 className="ticket-status-title">Ticket Status</h3>
          </div>
          <div className="ticket-status-body">
            <div className="ticket-status-count-wrapper">
              <p className="ticket-status-count">{tickets.length}</p>
              <div className="ticket-status-trend">
                <svg viewBox="0 0 24 24" className="trend-up-icon">
                  <path fill="currentColor" d="M21,7L14,14L10,10L3,17L4.5,18.5L10,13L14,17L22.5,8.5L21,7Z" />
                </svg>
                <span className="trend-value">12%</span>
              </div>
            </div>
            <p className="ticket-status-subtitle">Total Open Tickets</p>
            <div className="ticket-status-progress">
              <div className="progress-bar" style={{ width: `${Math.min(100, (tickets.length / 50) * 100)}%` }}></div>
            </div>
          </div>
        </WidgetBox>
      </div>
    </div>
  );
};

export default TicketsContent;