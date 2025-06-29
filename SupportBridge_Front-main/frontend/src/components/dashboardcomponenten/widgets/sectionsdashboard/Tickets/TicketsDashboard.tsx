import React, { useState } from 'react';
import "./TicketsDashboard.css";
import WidgetBox from '../../buildingwidgets/buildingwidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import faPlus for the regular plus, and faTrash for the delete icon
import { faInfoCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ticketsicon from './icons8-tickets-48_1.webp';
import Arrowicon from "./right-up (1).png"

// Interface for the "Huidige Tickets" widget (left)
interface CurrentTicket {
    name: string; // Only the name is needed
}

// Interface for the "Assigned" agenda widget (right - Groepen)
interface AssignedGroup {
    groupName: string; // The group's name
    ticketCount: number; // How many tickets are assigned to this group
    lastAssignedDate: string; // When the *last* ticket was assigned to this group
    status: 'Open' | 'Closed'; // Overall status for this group's tickets
}

const GroepenContent: React.FC = () => {
    // State for "Huidige Tickets" widget (left side)
    const [currentTickets] = useState<CurrentTicket[]>([
        { name: "Pizza Kaas Ticket" },
        { name: "Ham Burger Ticket" },
        { name: "Patatje Oorlog Ticket" },
        { name: "Broodje Kebab Ticket" },
    ]);

    // State for "Assigned" agenda widget (right side - Groepen)
    const [assignedGroups] = useState<AssignedGroup[]>([
        { groupName: "Groep Alpha", ticketCount: 5, lastAssignedDate: "10/06", status: "Open" },
        { groupName: "Groep Beta", ticketCount: 2, lastAssignedDate: "15/06", status: "Closed" },
        { groupName: "Groep Gamma", ticketCount: 8, lastAssignedDate: "01/06", status: "Open" },
        { groupName: "Groep Delta", ticketCount: 1, lastAssignedDate: "17/06", status: "Closed" },
    ]);

    return (
        <div className="Groepen-dashboard" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <WidgetBox className="aanwijzenticket">
                    <div className="header-with-info">
                        <img src={ticketsicon} alt="Tickets Icon" className="tickets-icon" />
                        <h2 className="titleAsigntickets">Huidige Tickets</h2>
                        <span className="info-icon" title="More information about tickets">
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </span>
                    </div>

                    <div className="ticket-list">
                        {currentTickets.length === 0 ? (
                            <div className="no-tickets-message">No tickets available.</div>
                        ) : (
                            currentTickets.map((ticket: CurrentTicket, index: number) => (
                                <div key={index} className="ticket-item">
                                    <span className="ticket-name">{ticket.name}</span>
                                    <div className="ticket-actions">
                                        {/* Plus Icon with Wrapper for Styling */}
                                        <div
                                            className="plus-icon-wrapper" // New wrapper class
                                            title="Add"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus} // Changed to faPlus
                                                className="action-icon plus-icon"
                                            />
                                        </div>
                                       <div
                                            className="delete-icon-wrapper" // New wrapper for delete
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="action-icon delete-icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </WidgetBox>
            </div>

            <WidgetBox className="Ticket-agenda">
                <p className="Title-Ticket-agenda">A.sign<span className='highlight'>ed</span></p>
                <h2 className="Date-Ticket-agenda">09/05/2025</h2>
                <div className="Ticket-moment">
                    <div className="Header-Ticket-moment">
                        <div className="Header-Ticket-moment-item">
                            <span className="header-col-name">Groepen</span>
                            <span className="header-col-ticket">Tickets</span>
                            <span className="header-col-date">Datum</span>
                            <span className="header-col-status">Status</span>
                            <span className="header-col-arrow"></span>
                        </div>
                    </div>
                    <div className="Date-ticket-moment-list">
                        {assignedGroups.map((group: AssignedGroup, index: number) => (
                            <div key={index} className="agenda-ticket-item">
                                <span className="agenda-col-name">{group.groupName}</span>
                                <span className="agenda-col-ticket">{group.ticketCount}</span>
                                <span className="agenda-col-date">{group.lastAssignedDate}</span>
                                <span className="agenda-col-status">
                                    {group.status}
                                </span>
                                <span className="agenda-col-arrow">
                                    <img src={Arrowicon} alt="Arrow Icon" className="arrow-icon" />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </WidgetBox>
        </div>
    );
};

export default GroepenContent;