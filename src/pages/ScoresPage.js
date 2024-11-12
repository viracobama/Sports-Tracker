// ScoresPage.js

import React, { useContext, useEffect, useState } from 'react';
import NavbarBS from '../components/Navbar';
import SportSelection from '../components/sportSelection';
import { GlobalStateContext } from '../components/GlobalState';
import FavTeamsFilter from '../components/FavTeamsFilter';
import FavTeamsReplacement from '../components/FavTeamsReplacement';
import '../styles/ScoresPage.css';
import '../styles/threeContainers.css'
import '../i18n.js'; // for language change
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function ScoresPage() {
  const { t } = useTranslation(); // Access the translation function
  const { globalState, isLoggedIn, currentUser } = useContext(GlobalStateContext);
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [scores, setScores] = useState({}); // Store scores by team name

  /**
   * Fetches a list of teams from TheSportsDB API based on the selected sport (NBA or NFL)
   * and stores the team data in the `teams` state.
   */
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(
          globalState.sport === 'NBA'
            ? 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NBA'
            : 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NFL'
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const data = await res.json();
        setTeams(data.teams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchTeams();
  }, [globalState.sport]);

  /**
   * Filters teams based on the logged-in user's favorite teams.
   * If the user is logged in, only the favorite teams are displayed; otherwise, all teams are shown.
   */
  useEffect(() => {
    if (isLoggedIn.bool && currentUser.favTeams.length > 0) {
      setFilteredTeams(teams.filter(team =>
        currentUser.favTeams.some(favTeam => favTeam.strTeam === team.strTeam)
      ));
    } else {
      setFilteredTeams(teams); // Show all teams if not filtering by favorite teams
    }
  }, [teams, isLoggedIn, currentUser]);

  /**
   * Fetches the latest scores for NBA or NFL games from ESPN's API.
   * Stores the scores in `scores` state, using team names as keys.
   * Each score entry includes team names, scores, date, and logos for both teams.
   */
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          globalState.sport === 'NBA'
            ? 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
            : 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const data = await res.json();
        const events = data.events;

        const scoresMap = {};
        events.forEach(event => {
          const homeTeam = event.competitions[0].competitors.find(comp => comp.homeAway === 'home');
          const awayTeam = event.competitions[0].competitors.find(comp => comp.homeAway === 'away');

          scoresMap[homeTeam.team.displayName] = {
            opponent: awayTeam.team.displayName,
            homeScore: homeTeam.score,
            awayScore: awayTeam.score,
            homeTeam: homeTeam.team.displayName,
            awayTeam: awayTeam.team.displayName,
            date: event.date,
            homeLogo: homeTeam.team.logo,    // Home team logo
            awayLogo: awayTeam.team.logo     // Away team logo
          };
        });
        setScores(scoresMap);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };

    fetchScores();
  }, [globalState.sport]);

  return (
    <div>
      <NavbarBS />
      <div className="main-content">
        {/* Sport selection component */}
        <div className="left-content">
          <SportSelection />
        </div>
        
        {/* Main content to display last single event for each team in a scrollable box */}
        <div className="middle-content">
          <h4>{globalState.sport} {t('scores_title')}</h4>
          <div className="scrollable-list">
            <ul>
              {filteredTeams.map((team, index) => (
                <li key={index} className="team-item">
                  <div>
                    <strong>{team.strTeam}</strong><br />
                    {scores[team.strTeam] ? (
                      <div>
                        <strong>{t('last_game')}</strong><br />
                        {/* Display the home team logo on the left and the away team logo on the right */}
                        <span>
                          <img src={scores[team.strTeam].homeLogo} alt={`${scores[team.strTeam].homeTeam} logo`} width="30" style={{ marginRight: '10px' }} />
                          {scores[team.strTeam].homeTeam} {scores[team.strTeam].homeScore} - {scores[team.strTeam].awayScore} {scores[team.strTeam].awayTeam}
                          <img src={scores[team.strTeam].awayLogo} alt={`${scores[team.strTeam].awayTeam} logo`} width="30" style={{ marginLeft: '10px' }} />
                        </span><br />
                        <span>{t('scores_date')} {new Date(scores[team.strTeam].date).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span>{t('no_game_data')}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side content for favorite teams */}
        <div className="right-content">
          {isLoggedIn.bool ? <FavTeamsFilter /> : <FavTeamsReplacement />}
        </div>
      </div>
    </div>
  );
}

export default ScoresPage;
