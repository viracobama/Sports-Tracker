// This is the SchedulePage component that displays a calendar of events for NBA or NFL games.
// The calender utilized i18n for language switching and the FullCalendar library for the calendar display.
// When the language is set to Spanish, the calender will display in Spanish and start on Monday.

import React, { useContext, useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import FavTeamsFilter from '../components/FavTeamsFilter.js';
import FavTeamsReplacement from '../components/FavTeamsReplacement.js';
import { Modal } from 'react-bootstrap';
import '../styles/schedule.css';
import { useTranslation } from 'react-i18next';
import esLocale from '@fullcalendar/core/locales/es';

function SchedulePage() {
  const { t, i18n } = useTranslation();
  const { globalState, isLoggedIn, removedTeams, currentUser } = useContext(GlobalStateContext);
  const sport = globalState.sport;

  const favTeams = useMemo(() => {
    return currentUser ? currentUser.favTeams : [];
  }, [currentUser]);

  const filteredTeams = useMemo(() => {
    return isLoggedIn.bool
      ? favTeams.filter(team => globalState.sport === team.strLeague)
      : [];
  }, [favTeams, globalState.sport, isLoggedIn.bool]);

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Determine FullCalendar locale dynamically
  const calendarLocale = useMemo(() => {
    return i18n.language === 'es' ? esLocale : undefined; // Default to 'en' if not 'es'
}, [i18n.language]);

  useEffect(() => {
    const ids = isLoggedIn.bool ? filteredTeams.map(team => team.idTeam) : null;

    let leagueSTR = 'https://www.thesportsdb.com/api/v1/json/907927/eventsseason.php?id=4391&s=2024';
    if (sport === 'NBA') {
      leagueSTR = 'https://www.thesportsdb.com/api/v1/json/907927/eventsseason.php?id=4387&s=2024-2025';
    }

    const fetchEvents = async () => {
      try {
        const res = await fetch(leagueSTR);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        const filteredEvents = isLoggedIn.bool
          ? data.events.filter(event => ids.includes(event.idHomeTeam) || ids.includes(event.idAwayTeam))
          : data.events;

        const fetchedEvents = filteredEvents.map(event => ({
          title: event.strEvent,
          date: event.dateEvent,
          strHomeTeam: event.strHomeTeam,
          strVenue: event.strVenue,
          strPoster: event.strPoster,
          eventDate: event.dateEvent,
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [sport, removedTeams, isLoggedIn.bool, filteredTeams]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const eventModal = ({ show, handleClose, event }) => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{event ? event._def.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          {event ? (
            <div>
              <p><strong>{t('date')}:</strong> {formatDate(event._def.extendedProps.eventDate)}</p>
              <p><strong>{t('home_team')}:</strong> {event._def.extendedProps.strHomeTeam}</p>
              <p><strong>{t('venue')}:</strong> {event._def.extendedProps.strVenue}</p>
              {event._def.extendedProps.strPoster && (
                <div>
                  <img src={event._def.extendedProps.strPoster} alt="Event Poster" style={{ width: '100%', height: 'auto' }} />
                </div>
              )}
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      <NavbarBS />
      <div className="main-content">
        <div className="left-content">
          <SportSelection />
        </div>
        <div className="middle-content" style={{ paddingRight: '70px' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ right: 'prev,today,next' }}
            events={events}
            eventClick={handleEventClick}
            aspectRatio={1.6}
            locale={calendarLocale} // Dynamically set the locale
          />
        </div>
        <div className="right-content">
          {isLoggedIn.bool ? <FavTeamsFilter /> : <FavTeamsReplacement />}
        </div>
      </div>
      {eventModal({ show: showModal, handleClose: handleCloseModal, event: selectedEvent })}
    </div>
  );
}

export default SchedulePage;
