/**
 * @file StatsPage.js is our Stats page that will display sport team stats.
 * 
 * - It uses the GlobalStateContext to access the sport selection to filter data.
 * - Imports the Navbar component to display the navigation bar.
 * - Imports the SportSelection component to display & allow for different sport selections.
 * 
 */

import React, {useContext} from 'react';
import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';

function StatsPage() {

  const {globalState, setGlobalState} = useContext(GlobalStateContext);
  const sport = globalState.sport;

  return (
    <div>
      <NavbarBS />
      <h1>Stats Page</h1>
      <br></br>
      <h3>Displaying information about <b>{sport}</b></h3>
      <SportSelection />
    </div>
  );
}

export default StatsPage;