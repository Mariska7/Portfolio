import React, { useState, useRef, useEffect } from 'react';
import WidgetBox from '../../buildingwidgets/buildingwidget.tsx';
import "./HomeDashboard.css";
import PercentageCircle from './precentagecircle/PercentageCircle.tsx';
import DateRangeGraphWidget from './statistics/DateRangeGraphWidget.tsx';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const HomeContent: React.FC = () => {
  const [isGebruikersActive, setIsGebruikersActive] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });

  const gebruikersRef = useRef<HTMLDivElement>(null);
  const groepenRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [events, setEvents] = useState([
    {
      title: 'Voorbeeld Event',
      start: new Date(2025, 4, 12, 10, 0),
      end: new Date(2025, 4, 12, 12, 0),
      allDay: false,
    },
  ]);

  const graphData = [
    { value: 75, dayLetter: 'M' },
    { value: 40, dayLetter: 'T' },
    { value: 90, dayLetter: 'W' },
    { value: 20, dayLetter: 'T' },
    { value: 60, dayLetter: 'F' },
    { value: 0, dayLetter: 'S' },
    { value: 0, dayLetter: 'S' },
  ];

  const handleSwitchToggle = (activateGebruikers: boolean) => {
    setIsGebruikersActive(activateGebruikers);
  };

  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeOptionRef = isGebruikersActive ? gebruikersRef : groepenRef;
      const containerElement = containerRef.current;

      if (activeOptionRef.current && containerElement) {
        const activeOptionElement = activeOptionRef.current;
        let width = activeOptionElement.offsetWidth + 10;
        const containerPaddingLeft = parseFloat(window.getComputedStyle(containerElement).paddingLeft);
        const left = isGebruikersActive
          ? activeOptionElement.offsetLeft - containerPaddingLeft
          : 95;
        const adjustedLeft = left - 5;

        setIndicatorStyle({
          left: `${adjustedLeft}px`,
          width: `${width}px`,
        });
      }
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [isGebruikersActive]);

  return (
    <div className="home-widgets">
      <div className="users-groups-switch-container" ref={containerRef}>
        <div
          className={`switch-option ${isGebruikersActive ? 'active' : ''}`}
          onClick={() => handleSwitchToggle(true)}
          ref={gebruikersRef}
        >
          Gebruikers
        </div>
        <div
          className={`switch-option ${!isGebruikersActive ? 'active' : ''}`}
          onClick={() => handleSwitchToggle(false)}
          ref={groepenRef}
        >
          Groepen
        </div>
        <div className="switch-indicator" style={indicatorStyle}></div>
      </div>

      <div className="UsersandGroups">
        {isGebruikersActive ? (
          <WidgetBox>Content for Gebruikers</WidgetBox>
        ) : (
          <WidgetBox>Content for Groepen</WidgetBox>
        )}
      </div>

      <div className="bottom-row">
        <WidgetBox className="Statistics">
          <DateRangeGraphWidget
            startDate="1 May 2025"
            endDate="7 May 2025"
            data={graphData}
          />
        </WidgetBox>
        <WidgetBox className="precentagethingy">
          <PercentageCircle percentage={70} radius={70} useGradient={true} strokeWidth={30} />
        </WidgetBox>
      </div>

      <div className="Agenda">
        <WidgetBox>
          <DnDCalendar
            localizer={localizer}
            events={events}
            onEventDrop={({ event, start, end }) => {
              const updatedEvent = { ...event, start, end };
              setEvents((prev) =>
                prev.map((e) => (e === event ? updatedEvent : e))
              );
            }}
            onEventResize={({ event, start, end }) => {
              const updatedEvent = { ...event, start, end };
              setEvents((prev) =>
                prev.map((e) => (e === event ? updatedEvent : e))
              );
            }}
            resizable
            selectable
            onSelectSlot={(slotInfo) => {
              const title = prompt('Nieuwe afspraak titel:');
              if (title) {
                const newEvent = {
                  title,
                  start: slotInfo.start,
                  end: slotInfo.end,
                  allDay: slotInfo.action === 'click' || slotInfo.slots?.length === 1,
                };
                setEvents((prev) => [...prev, newEvent]);
              }
            }}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: 500 }}
          />
        </WidgetBox>
      </div>
    </div>
  );
};

export default HomeContent;