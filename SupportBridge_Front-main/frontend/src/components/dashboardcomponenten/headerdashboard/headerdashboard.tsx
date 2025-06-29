// src/components/Headerdashboard.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Mail, Bell, User } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import './headerdashboard.css';

// Import your page content components (no .tsx extension)
import HomeContent from '../widgets/sectionsdashboard/home/HomeDashboard';
import GebruikersContent from '../widgets/sectionsdashboard/Gebruikers/GebruikersDashboard';
import TicketsContent from '../widgets/sectionsdashboard/Tickets/TicketsDashboard';
import GroepenContent from '../widgets/sectionsdashboard/groepen/GroepenDashboard';
import Ticket from '../widgets/sectionsdashboard/newticket/Ticket';

import PopupMenu from '../widgets/popupwidgets/PopupMenu';
import MailPopupMenuContent from '../widgets/popupwidgets/Message';
import BellPopupMenuContent from '../widgets/popupwidgets/Notifications';
import UserPopupMenuContent from '../widgets/popupwidgets/User';

const pageTabs = [
  { name: 'Home', component: <HomeContent /> },
  { name: 'Gebruikers', component: <GebruikersContent /> },
  { name: 'Tickets', component: <TicketsContent /> },
  { name: 'Groepen', component: <GroepenContent /> },
  { name: 'New Ticket', component: <Ticket />, hidden: true }
];

type HeaderdashboardProps = {
  currentTheme: "light" | "dark";
  onToggleTheme: () => void;
};

const Headerdashboard: React.FC<HeaderdashboardProps> = ({ currentTheme, onToggleTheme }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialIndex = pageTabs.findIndex(tab => tab.name.toLowerCase() === tabParam?.toLowerCase());
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  const [isMailPopupOpen, setIsMailPopupOpen] = useState(false);
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const mailCircleRef = useRef<HTMLDivElement>(null);
  const bellCircleRef = useRef<HTMLDivElement>(null);
  const userCircleRef = useRef<HTMLDivElement>(null);

  const linkRefs = useRef<Map<number, HTMLAnchorElement | null>>(new Map());
  const containerRef = useRef<HTMLDivElement | null>(null); // This is the .pageselection div

  const updateIndicator = useCallback(() => {
    const activeTabOriginalIndex = activeIndex;
    const activeEl = linkRefs.current.get(activeTabOriginalIndex);
    const containerEl = containerRef.current; // The parent .pageselection container

    if (activeEl && containerEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      // Calculate 'left' relative to the parent container's content box
      // We are *not* adjusting for padding here, keeping it under the full element
      const left = activeRect.left - containerRect.left;

      // Keep width as the full width of the element, including padding
      const width = activeRect.width;

      containerEl.style.setProperty('--indicator-left', `${left}px`);
      containerEl.style.setProperty('--indicator-width', `${width}px`);
    }
  }, [activeIndex]);

  useEffect(() => {
    // Initial render and window resize
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const newIsHeaderCompact = pageTabs[activeIndex].name !== 'Home';
    setIsHeaderCompact(newIsHeaderCompact);

    // Give CSS transitions more time to complete, especially if there are multiple or slower ones.
    // Let's try a value that is longer than the longest transition (0.5s = 500ms).
    const timeoutId = setTimeout(() => {
      updateIndicator();
    }, 550); // Increased delay to ensure all 0.5s transitions have finished

    return () => clearTimeout(timeoutId);
  }, [activeIndex, updateIndicator]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setMenuOpen(false);
    const tabName = pageTabs[index].name;
    setSearchParams({ tab: tabName });
  };

  const closeAllPopups = () => {
    setIsMailPopupOpen(false);
    setIsBellPopupOpen(false);
    setIsUserPopupOpen(false);
  };

  const togglePopup = (setPopupState: React.Dispatch<React.SetStateAction<boolean>>) => {
    closeAllPopups();
    setPopupState(prev => !prev);
  };

  return (
    <>
      <div className={`headercolumn ${isHeaderCompact ? 'compact' : ''}`}>
        <div className="logoPagesection">
          <button
            className="hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <p className="logodashboardheader">
            A.sing<span className="highlight">It</span>
          </p>

          <div
            className={`pageselection ${menuOpen ? 'open' : ''}`}
            ref={containerRef}
          >
            {pageTabs
              .map((tab, index) => ({ ...tab, originalIndex: index }))
              .filter(tab => !tab.hidden)
              .map((tab) => (
                <a
                  key={tab.originalIndex}
                  href="#"
                  className={`pageLink ${activeIndex === tab.originalIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(tab.originalIndex);
                  }}
                  ref={(el) => {
                    linkRefs.current.set(tab.originalIndex, el);
                  }}
                  tabIndex={0}
                >
                  {tab.name}
                </a>
              ))
            }
            <div className="slide-indicator" />
          </div>
        </div>

               <div className="IconSectionHeader">
          <div className={`search-wrapper ${showSearch ? 'open' : ''}`}>
            {showSearch && (
              <input
                type="text"
                className="search-input-expanded"
                placeholder="Zoek..."
                autoFocus
              />
            )}
            <div
              className="circle search-circle"
              onClick={() => {
                setShowSearch(prev => !prev);
                closeAllPopups();
              }}
            >
              <Search />
            </div>
          </div>

          {/* Mail Icon with Popup */}
          <div
            className="circle"
            onClick={() => togglePopup(setIsMailPopupOpen)}
            ref={mailCircleRef}
          >
            <Mail />
          </div>
          <PopupMenu
            isOpen={isMailPopupOpen}
            onClose={() => setIsMailPopupOpen(false)}
            targetRef={mailCircleRef as React.RefObject<HTMLElement>}
            position="bottom-right"
          >
            <MailPopupMenuContent />
          </PopupMenu>

          {/* Bell Icon with Popup */}
          <div
            className="circle"
            onClick={() => togglePopup(setIsBellPopupOpen)}
            ref={bellCircleRef}
          >
            <Bell />
          </div>
          <PopupMenu
            isOpen={isBellPopupOpen}
            onClose={() => setIsBellPopupOpen(false)}
            targetRef={bellCircleRef as React.RefObject<HTMLElement>}
            position="bottom-right"
          >
            <BellPopupMenuContent />
          </PopupMenu>

          {/* User Icon with Popup */}
          <div
            className="circle"
            onClick={() => togglePopup(setIsUserPopupOpen)}
            ref={userCircleRef}
          >
            <User />
          </div>
          <PopupMenu
            isOpen={isUserPopupOpen}
            onClose={() => setIsUserPopupOpen(false)}
            targetRef={userCircleRef as React.RefObject<HTMLElement>}
            position="bottom-right"
          >
            <UserPopupMenuContent
              userName="Leraar"
              userEmail="leraar@example.com"
              currentTheme={currentTheme}
              onToggleTheme={onToggleTheme}
            />
          </PopupMenu>
        </div>

        <div className="GreetingText">
          <h1>Goedemorgen Leraar</h1>
        </div>

        <button
          className={`HeaderNewticket ${isHeaderCompact ? 'under-header' : ''}`}
          onClick={() => {
            const newTicketIndex = pageTabs.findIndex(tab => tab.name === 'New Ticket');
            handleTabClick(newTicketIndex);
          }}
        >
          + New ticket
        </button>
      </div>

      <div className="dashboard-content">
        {pageTabs[activeIndex].component}
      </div>
    </>
  );
};

export default Headerdashboard;