/* This component is used to filter the sports data by the user's favorite teams.
- It appears on the right hand side of the main pages.

*/

import React, { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Filled in heart icon
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
//Outlined heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import { GlobalStateContext } from './GlobalState';
import '../styles/account.css';

const FavTeamsFilter = () => {

    // Get the sport selected and the current user's favorite teams from the GlobalStateContext
    const {currentUser, globalState} = useContext(GlobalStateContext);
    const favTeams = currentUser.favTeams;

    //The removedTeams state keeps track of the teams that the user removes from the filter
    const [removedTeams, setRemovedTeams] = useState([]);

    //This function handles the removal of a team from the filter
    const handleRemoveTeamFilter = (team) => {
        if (removedTeams.includes(team)) {
            setRemovedTeams(removedTeams.filter(t => t !== team));
          } else {
            setRemovedTeams([...removedTeams, team]);
          }
    };

    //Filter the favorite teams by the sport selected - only show the teams that match the league
    const filteredTeams = favTeams.filter(team => globalState.sport === team.strLeague);

    return (
        <div>
            <h6>Filter By Your Favorite Teams:</h6>
            <p id='subtext'>Add or remove teams on your account page!</p>
            <br/>
            {/* List of favorite teams within the selected league */}
            <ul id="favTeams">
                {filteredTeams.map(team => (
                        <li key={team}>
                            <span id='teams' onClick={() => handleRemoveTeamFilter(team)}>
                                <FontAwesomeIcon 
                                id = "icon"
                                icon={ removedTeams.includes(team) ? regularHeart : solidHeart} 
                                style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px'}}
                                />
                                {team.strTeam} ({team.strLeague})                  
                            </span>
                        </li>
                ))}
            </ul>
        </div>
    );
};

export default FavTeamsFilter;
