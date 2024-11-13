/* This component is used to filter the sports data by the user's favorite teams.
- It appears on the right hand side of the main pages.
*/

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Filled-in heart icon
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
// Outlined heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import { GlobalStateContext } from './GlobalState';
import '../styles/account.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

const FavTeamsFilter = () => {
    const { t } = useTranslation(); // Access the translation function
    const { currentUser, globalState, removedTeams, setRemovedTeams } = useContext(GlobalStateContext);
    const favTeams = currentUser.favTeams;

    // Handles the removal of a team from the filter
    const handleRemoveTeamFilter = (team) => {
        if (removedTeams.includes(team)) {
            const filteredTeams = removedTeams.filter(t => t !== team);
            setRemovedTeams(filteredTeams);
        } else {
            const filteredTeams = [...removedTeams, team];
            setRemovedTeams(filteredTeams);
        }
    };

    // Filter the favorite teams by the sport selected - only show the teams that match the league
    const filteredTeams = favTeams.filter(team => globalState.sport === team.strLeague);

    return (
        <div>
            {/* Use translation key for filter title */}
            <h6>{t('filter_teams')}</h6>
            <p id='subtext'>{t('add_remove')}</p>
            <br/>
            {/* List of favorite teams within the selected league */}
            <ul id="favTeams">
                {filteredTeams.map(team => (
                    <li key={team.strTeam}>
                        <span id='teams' onClick={() => handleRemoveTeamFilter(team)}>
                            <FontAwesomeIcon 
                                id="icon"
                                icon={removedTeams.includes(team) ? regularHeart : solidHeart} 
                                style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px' }}
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
