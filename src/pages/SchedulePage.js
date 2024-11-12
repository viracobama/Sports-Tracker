/**
 * @file SchedulePage.js is our Schedule page that will display sport events.
 * 
 * - It uses the GlobalStateContext to access the sport selection to filter data.
 * - Imports the Navbar component to display the navigation bar.
 * - Imports the SportSelection component to display & allow for different sport selections.
 * - Imports the FavTeamsFilter component to display the favorite teams filter.
 * - Imports dayGridPlugin from FullCalendar to display the calendar.
 */

import React, {useContext, useState, useEffect} from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import FavTeamsFilter from '../components/FavTeamsFilter.js';
import FavTeamsReplacement from '../components/FavTeamsReplacement.js';

import '../styles/schedule.css'
import { Modal } from 'react-bootstrap';

function SchedulePage() {

  // Get the global state, the user's login status, and the current user from the GlobalStateContext
  const {globalState, isLoggedIn, removedTeams, NFLteams} = useContext(GlobalStateContext);
  const sport = globalState.sport;

  const [events, setEvents] = useState([]);


  useEffect(() => {
    // set the ids based on removedTeams
    let ids = removedTeams.map(team => team.idTeam);

    //Determining the API endpoint attributes based on the sport selected
    let leagueSTR = 'https://www.thesportsdb.com/api/v1/json/907927/eventsseason.php?id=4391&s=2024'

    if (sport === 'NBA') {
      leagueSTR = 'https://www.thesportsdb.com/api/v1/json/907927/eventsseason.php?id=4387&s=2024-2025'
    }

    // Fetch the events based on the sport selected
    const fetchEvents = async () => {
        try {
            const res = await fetch(leagueSTR);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();

            // Filter out the events that are from the removed teams
            const filteredEvents = data.events.filter(event => !ids.includes(event.idHomeTeam) && !ids.includes(event.idAwayTeam));
            // Map the fetched events to the format needed for the FullCalendar component
            const fetchedEvents = filteredEvents.map(event => ({
              title: event.strEvent,
              date: event.dateEvent,
              strHomeTeam: event.strHomeTeam,
              strVenue: event.strVenue,
              strPoster: event.strPoster,
              eventDate: event.dateEvent
            }));
            // Set the events state to the fetched events
            setEvents(fetchedEvents);
        } catch (error) {
            console.error("Failed to fetch NBA teams:", error);
        }
    };

    // Call the fetchEvents function
    fetchEvents();

  }, [sport, removedTeams]);

  // code to handle an event click
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //When an event is clicked, set the selected event and show the modal
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    console.log(clickInfo.event);
    setShowModal(true);
  };

  //Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  //Function to display the modal with the event details
  const eventModal = ({ show, handleClose, event }) => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };

    return (
        // Modal to display the event details
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{event ? event._def.title : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
            {event ? (
            <div>
              <p><strong>Date:</strong> {formatDate(event._def.extendedProps.eventDate)}</p>
              <p><strong>Home Team:</strong> {event._def.extendedProps.strHomeTeam}</p>
              <p><strong>Venue:</strong> {event._def.extendedProps.strVenue}</p>
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

  // Return the SchedulePage component
  return (
    <div>
        <NavbarBS />
        {/* A div holding page's entire content */}
        <div className="main-content">
            {/* left content - formatting the sport selection to left */}
            <div className="left-content">
                <SportSelection />
            </div>
            {/* Calendar Layout */}
            <div className="middle-content" style={{ paddingRight: '70px' }}>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  right: 'prev,today,next'}}
                events={events}
                eventClick={handleEventClick} // Set up event click handler
                aspectRatio={1.6}
              />

            </div>
            {/* right content - formatting the favorite teams to the right */}
            <div className="right-content">
            {isLoggedIn.bool ? (
              <FavTeamsFilter/>
            ) : (
              <FavTeamsReplacement/>
            )}
            </div>
        </div>  
        
        {eventModal({ show: showModal, handleClose: handleCloseModal, event: selectedEvent })}          
    </div>
  );
}

export default SchedulePage;