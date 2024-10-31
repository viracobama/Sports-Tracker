/**
 * @file SchedulePage.js is our Schedule page that will display sport events.
 * 
 * - It uses the GlobalStateContext to access the sport selection to filter data.
 * - Imports the Navbar component to display the navigation bar.
 * - Imports the SportSelection component to display & allow for different sport selections.
 */

import React, {useContext} from 'react';
import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import FavTeamsFilter from '../components/FavTeamsFilter.js';
import FavTeamsReplacement from '../components/FavTeamsReplacement.js';


function SchedulePage() {

  // Get the global state, the user's login status, and the current user from the GlobalStateContext
  const {globalState, isLoggedIn, currentUser} = useContext(GlobalStateContext);
  const sport = globalState.sport;

  return (
    <div>
        <NavbarBS />
        {/* A div holding page's entire content */}
        <div className="main-content">
            {/* left content - formatting the sport selection to left */}
            <div className="left-content">
                <SportSelection />
            </div>
            {/* Page specific content - main content */}
            <div className="middle-content">
              <h4>To-Do: add content for schedule page</h4>
              
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
    </div>
  );
}

export default SchedulePage;