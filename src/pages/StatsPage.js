/**
 * @file StatsPage.js is our Stats page that will display sport team stats.
 * 
 * - It uses the GlobalStateContext to access the sport selection to filter data and current user.
 * - Imports the Navbar component to display the navigation bar.
 * - Imports the SportSelection component to display & allow for different sport selections.
 * 
 */

import React, {useContext, useEffect, useState} from 'react';
import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import '../styles/statsPage.css';
import '../i18n.js'; // for language change
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function StatsPage() {
  const { t } = useTranslation(); // Access the translation function
  const { globalState } = useContext(GlobalStateContext);
  const sport = globalState.sport;
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const [qbLeaderboard, setQbLeaderboard] = useState([]);
  const [wrLeaderboard, setWrLeaderboard] = useState([]);
  const [rbLeaderboard, setRbLeaderboard] = useState([]);
  const [qbRushingLeaderboard, setQbRushingLeaderboard] = useState([]);
  const [qbTouchdownsLeaderboard, setQbTouchdownsLeaderboard] = useState([]);
  const [qbFilter, setQbFilter] = useState('passing');
  const [wrReceptionsLeaderboard, setWrReceptionsLeaderboard] = useState([]);
  const [wrTouchdownsLeaderboard, setWrTouchdownsLeaderboard] = useState([]);
  const [wrFilter, setWrFilter] = useState('receiving');
  const [rbReceptionsLeaderboard, setRbReceptionsLeaderboard] = useState([]);
  const [rbTouchdownsLeaderboard, setRbTouchdownsLeaderboard] = useState([]);
  const [rbFilter, setRbFilter] = useState('rushing');
  const [defSacksLeaderboard, setDefSacksLeaderboard] = useState([]);
  const [defInterceptionsLeaderboard, setDefInterceptionsLeaderboard] = useState([]);
  const [defFilter, setDefFilter] = useState('sacks');
  const [nbaPointsLeaderboard, setNbaPointsLeaderboard] = useState([]);
  const [nbaAssistsLeaderboard, setNbaAssistsLeaderboard] = useState([]);
  const [nbaReboundsLeaderboard, setNbaReboundsLeaderboard] = useState([]);
  const [nbaOffensiveFilter, setNbaFilter] = useState('points');
  const [nbaDefensiveFilter, setNbaDefensiveFilter] = useState('rebounds');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [nbaStealsLeaderboard, setNbaStealsLeaderboard] = useState([]);
  const [nbaBlocksLeaderboard, setNbaBlocksLeaderboard] = useState([]);
  const [defTacklesLeaderboard, setDefTacklesLeaderboard] = useState([]);
  const [nbaThreePointersPercentageLeaderboard, setNbaThreePointersPercentageLeaderboard] = useState([]);
  const nbaTeamLogos = {
    ATL: 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg',
    BOS: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
    BKN: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg',
    CHA: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg',
    CHI: 'https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg',
    CLE: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_logo.svg',
    DAL: 'https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg',
    DEN: 'https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg',
    DET: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Detroit_Pistons_logo.svg',
    GS: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg',
    HOU: 'https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg',
    IND: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg',
    LAC: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg',
    LAL: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
    MEM: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg',
    MIA: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg',
    MIL: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg',
    MIN: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg',
    NOP: 'https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg',
    NY: 'https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg',
    OKC: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg',
    ORL: 'https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg',
    PHI: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg',
    PHO: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg',
    POR: 'https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg',
    SAC: 'https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg',
    SA: 'https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg',
    TOR: 'https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg',
    UTA: 'https://upload.wikimedia.org/wikipedia/en/0/04/Utah_Jazz_logo.svg',
    WAS: 'https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg'
  };
  
  useEffect(() => {
    if (sport === 'NFL') {
    // Fetch player data
    fetch(`https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setPlayers(data);
      })
      .catch(err => {
        console.error('Fetch players error:', err);
      });

      // Fetch team data
    fetch(`https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setTeams(data);
    })
    .catch(err => {
      console.error('Fetch teams error:', err);
    });
    // Fetch QB passing yards leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/QB/PassingYards?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched QB data:', data); // Log the fetched data
        setQbLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch QB error:', err); // Log any errors
      });
    // Fetch QB rushing yards leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/QB/RushingYards?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Fetched QB Rushing data:', data); // Log the fetched data
      setQbRushingLeaderboard(data);
    })
    .catch(err => {
      console.error('Fetch QB Rushing error:', err); // Log any errors
    });

    // Fetch QB touchdowns leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/QB/PassingTouchdowns?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched QB Touchdowns data:', data); // Log the fetched data
        setQbTouchdownsLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch QB Touchdowns error:', err); // Log any errors
      });

    // Fetch WR receiving yards leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/WR/ReceivingYards?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched WR data:', data); // Log the fetched data
        setWrLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch WR error:', err); // Log any errors
      });

      // Fetch WR Receptions leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/WR/Receptions?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Fetched WR Receptions data:', data); // Log the fetched data
      setWrReceptionsLeaderboard(data);
    })
    .catch(err => {
      console.error('Fetch WR Receptions error:', err); // Log any errors
    });

    // Fetch WR Touchdowns leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/WR/Touchdowns?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Fetched WR Touchdowns data:', data); // Log the fetched data
      setWrTouchdownsLeaderboard(data);
    })
    .catch(err => {
      console.error('Fetch WR Touchdowns error:', err); // Log any errors
    });

    // Fetch RB rushing leaderboard
    fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/RB/RushingYards?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched RB data:', data); // Log the fetched data
        setRbLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch RB error:', err); // Log any errors
      });

      // Fetch RB Touchdowns leaderboard
      fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/RB/Touchdowns?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched RB Touchdowns data:', data); // Log the fetched data
        setRbTouchdownsLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch RB Touchdowns error:', err); // Log any errors
      });

      // Fetch RB Receptions leaderboard
      fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/RB/Receptions?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched RB Receptions data:', data); // Log the fetched data
        setRbReceptionsLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch RB Receptions error:', err); // Log any errors
      });
      
      // Fetch Defensive Sacks leaderboard
      fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/DEFENSE/Sacks?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched DEF data:', data); // Log the fetched data
        setDefSacksLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch DEF error:', err); // Log any errors
      });
      
      // Fetch Defensive Interceptions leaderboard
      fetch(`https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024REG/DEFENSE/Interceptions?key=3fba8bedc39f473fae97e09ab0bfe906`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched DEF Interceptions data:', data); // Log the fetched data
        setDefInterceptionsLeaderboard(data);
      })
      .catch(err => {
        console.error('Fetch DEF Interceptions error:', err); // Log any errors
      });

      fetch('https://api.sportsdata.io/v3/nfl/stats/json/SeasonLeagueLeaders/2024/DEFENSE/tackles?key=3fba8bedc39f473fae97e09ab0bfe906')
    .then(response => response.json())
    .then(data => setDefTacklesLeaderboard(data))
    .catch(err => console.error('Fetch NFL Tackles error:', err));

      
    } else if (sport === 'NBA') {
      // Fetch NBA Points leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
`, options)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Fetched NBA Points data:', data); // Log the fetched data
          setNbaPointsLeaderboard(data.sort((a, b) => b.Points - a.Points));
        })
        .catch(err => {
          console.error('Fetch NBA Points error:', err); // Log any errors
        });

      // Fetch NBA Assists leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
`, options)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Fetched NBA Assists data:', data); // Log the fetched data
          setNbaAssistsLeaderboard(data.sort((a, b) => b.Assists - a.Assists));
        })
        .catch(err => {
          console.error('Fetch NBA Assists error:', err); // Log any errors
        });

      // Fetch NBA Rebounds leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
`, options)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Fetched NBA Rebounds data:', data); // Log the fetched data
          setNbaReboundsLeaderboard(data.sort((a, b) => b.Rebounds - a.Rebounds));
        })
        .catch(err => {
          console.error('Fetch NBA Rebounds error:', err); // Log any errors
        });

        // Fetch NBA Steals leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
        `, options)
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then(data => {
                  console.log('Fetched NBA Rebounds data:', data); // Log the fetched data
                  setNbaStealsLeaderboard(data.sort((a, b) => b.Steals - a.Steals));
                })
                .catch(err => {
                  console.error('Fetch NBA Steals error:', err); // Log any errors
                });

                // Fetch NBA blocked shots leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
        `, options)
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then(data => {
                  console.log('Fetched NBA Rebounds data:', data); // Log the fetched data
                  setNbaBlocksLeaderboard(data.sort((a, b) => b.BlockedShots - a.BlockedShots));
                })
                .catch(err => {
                  console.error('Fetch NBA BlockedShots error:', err); // Log any errors
                });
                // Fetch NBA 3 point percentage leaderboard
      fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2024?key=5bc55735b64942c2b00538dea52fb146
        `, options)
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then(data => {
                  console.log('Fetched NBA 3point data:', data); // Log the fetched data
                  setNbaThreePointersPercentageLeaderboard(data.sort((a, b) => b.ThreePointersPercentage - a.ThreePointersPercentage));
                })
                .catch(err => {
                  console.error('Fetch NBA 3point error:', err); // Log any errors
                });
    }
  }, [sport]);

  const handleQbFilterChange = (event) => {
    setQbFilter(event.target.value);
  };

  const handleWrFilterChange = (event) => {
    setWrFilter(event.target.value);
  };

  const handleRbFilterChange = (event) => {
    setRbFilter(event.target.value);
  };

  const handleDefFilterChange = (event) => {
    setDefFilter(event.target.value);
  };

 const handleNbaOffensiveFilterChange = (event) => {
    setNbaFilter(event.target.value);
  };
  const handleNbaDefensiveFilterChange = (event) => {
    setNbaDefensiveFilter(event.target.value);
  };

  const getPlayerTeam = (playerId) => {
    const player = players.find(p => p.PlayerID === playerId);
    return player ? player.Team : 'Unknown';
  };

  const getTeamLogo = (teamName) => {
    if (sport === 'NFL') {
      const team = teams.find(t => t.Key === teamName);
      return team ? team.WikipediaLogoUrl : '';
    } else if (sport === 'NBA') {
      return nbaTeamLogos[teamName] || '';
    }
    return '';
  };

  const getPlayerFullName = (playerId) => {
    const player = players.find(p => p.PlayerID === playerId);
    return player ? `${player.FirstName} ${player.LastName}` : 'Unknown';
  };

  return (
    <div>
      <NavbarBS />
      <div className="main-header">
      <h2>{sport === 'NFL' ? `${t('NFL')}` : `${t('NBA')}`}</h2>
      </div>
      <div className="main-content1">
        <div className="left-content">
          <SportSelection />
        </div>
        {sport === 'NFL' ? (
          <>
            <div className="middle-left-content">
              <div className="header-filter">
                
                <h5>{t('quarterbacks')}</h5>
                <select onChange={handleQbFilterChange} value={qbFilter}>
                  <option value="passing">{t('passing_yards')}</option>
                  <option value="rushing">{t('rushing_yards')}</option>
                  <option value="touchdowns">{t('touchdowns')}</option>
                </select>
              </div>
              <ol>
                {(qbFilter === 'passing' ? qbLeaderboard : qbFilter === 'rushing' ? qbRushingLeaderboard : qbTouchdownsLeaderboard).slice(0, 10).map((player, index) => (
                  <li key={player.PlayerID}>
                    {index + 1}. {getPlayerFullName(player.PlayerID)} ({getPlayerTeam(player.PlayerID)}) <img src={getTeamLogo(getPlayerTeam(player.PlayerID))} alt={getPlayerTeam(player.PlayerID)} style={{ width: '30px', height: '20px' }} />: {qbFilter === 'passing' ? player.PassingYards : qbFilter === 'rushing' ? player.RushingYards : player.PassingTouchdowns} {qbFilter === 'passing' ? 'pass yds' : qbFilter === 'rushing' ? 'rushing yds' : 'TDs'}
                  </li>
                ))}
              </ol>
              <div className="header-filter">
                <h5>{t('wide_receivers')}</h5>
                <select onChange={handleWrFilterChange} value={wrFilter}>
                  <option value="receiving">{t('receiving_yards')}</option>
                  <option value="receptions">{t('receptions')}</option>
                  <option value="wrTouchdowns">{t('touchdowns')}</option>
                </select>
              </div>
              <ol>
                {(wrFilter === 'receiving' ? wrLeaderboard : wrFilter === 'receptions' ? wrReceptionsLeaderboard : wrTouchdownsLeaderboard).slice(0, 10).map((player, index) => (
                  <li key={player.PlayerID}>
                    {index + 1}. {getPlayerFullName(player.PlayerID)} ({getPlayerTeam(player.PlayerID)}) <img src={getTeamLogo(getPlayerTeam(player.PlayerID))} alt={getPlayerTeam(player.PlayerID)} style={{ width: '30px', height: '20px' }} />: {wrFilter === 'receiving' ? player.ReceivingYards : wrFilter === 'receptions' ? player.Receptions : player.Touchdowns} {wrFilter === 'receiving' ? 'receiving yds' : wrFilter === 'receptions' ? 'receptions' : 'TDs'}
                  </li>
                ))}
              </ol>
            </div>
            <div className="middle-right-content">
              <div className="header-filter">
                <h5>{t('running_backs')}</h5>
                <select onChange={handleRbFilterChange} value={rbFilter}>
                  <option value="rushing">{t('rushing_yards')}</option>
                  <option value="rbReceptions">{t('receptions')}</option>
                  <option value="rbTouchdowns">{t('touchdowns')}</option>
                </select>
              </div>
              <ol>
                {(rbFilter === 'rushing' ? rbLeaderboard : rbFilter === 'rbReceptions' ? rbReceptionsLeaderboard : rbTouchdownsLeaderboard).slice(0, 10).map((player, index) => (
                  <li key={player.PlayerID}>
                    {index + 1}. {getPlayerFullName(player.PlayerID)} ({getPlayerTeam(player.PlayerID)}) <img src={getTeamLogo(getPlayerTeam(player.PlayerID))} alt={getPlayerTeam(player.PlayerID)} style={{ width: '30px', height: '20px' }} />: {rbFilter === 'rushing' ? player.RushingYards : rbFilter === 'rbReceptions' ? player.Receptions : player.Touchdowns} {rbFilter === 'rushing' ? 'rushing yds' : rbFilter === 'rbReceptions' ? 'receptions' : 'TDs'}
                  </li>
                ))}
              </ol>
              <div className="header-filter">
                <h5>{t('defensive_players')}</h5>
                <select onChange={handleDefFilterChange} value={defFilter}>
                <option value="sacks">{t('sacks')}</option>
                <option value="interceptions">{t('interceptions')}</option>
                <option value="tackles">{t('tackles')}</option>
              </select>
            </div>
            <ol>
              {(defFilter === 'sacks' ? defSacksLeaderboard : defFilter === 'interceptions' ? defInterceptionsLeaderboard : defTacklesLeaderboard).slice(0, 10).map((player, index) => (
                <li key={player.PlayerID}>
                  {index + 1}. {getPlayerFullName(player.PlayerID)} ({getPlayerTeam(player.PlayerID)}) <img src={getTeamLogo(getPlayerTeam(player.PlayerID))} alt={getPlayerTeam(player.PlayerID)} style={{ width: '30px', height: '20px' }} />: {defFilter === 'sacks' ? player.Sacks : defFilter === 'interceptions' ? player.Interceptions : player.Tackles} {defFilter === 'sacks' ? 'Sacks' : defFilter === 'interceptions' ? 'Ints' : 'Tackles'}
                </li>
              ))}
            </ol>
            </div>
          </>
        ) : (
          <>
<div className="middle-left-content">
  <div className="header-filter">
    <h5>{t('nba_offensive_players')}</h5>
    <select onChange={handleNbaOffensiveFilterChange} value={nbaOffensiveFilter}>
      <option value="points">{t('points')}</option>
      <option value="assists">{t('assists')}</option>
      <option value="threePointersPercentage">{t('three_pointers_percentage')}</option>
    </select>
  </div>
  <ol>
    {(nbaOffensiveFilter === 'points' ? nbaPointsLeaderboard : nbaOffensiveFilter === 'assists' ? nbaAssistsLeaderboard : nbaThreePointersPercentageLeaderboard).slice(0, 10).map((player, index) => (
      <li key={player.PlayerID}>
        {index + 1}. {player.Name} ({player.Team}) <img src={getTeamLogo(player.Team)} alt={player.Team} style={{ width: '30px', height: '20px' }} />: {nbaOffensiveFilter === 'points' ? player.Points : nbaOffensiveFilter === 'assists' ? player.Assists : player.ThreePointersPercentage} {nbaOffensiveFilter === 'points' ? 'pts' : nbaOffensiveFilter === 'assists' ? 'asts' : '3P%'}
      </li>
    ))}
  </ol>
</div>
<div className="middle-left-content">
  <div className="header-filter">
    <h5>{t('nba_defensive_players')}</h5>
    <select onChange={handleNbaDefensiveFilterChange} value={nbaDefensiveFilter}>
      <option value="rebounds">{t('rebounds')}</option>
      <option value="steals">{t('steals')}</option>
      <option value="blocks">{t('blocks')}</option>
    </select>
  </div>
  <ol>
    {(nbaDefensiveFilter === 'rebounds' ? nbaReboundsLeaderboard : nbaDefensiveFilter === 'steals' ? nbaStealsLeaderboard : nbaBlocksLeaderboard).slice(0, 10).map((player, index) => (
      <li key={player.PlayerID}>
        {index + 1}. {player.Name} ({player.Team}) <img src={getTeamLogo(player.Team)} alt={player.Team} style={{ width: '30px', height: '20px' }} />: {nbaDefensiveFilter === 'rebounds' ? player.Rebounds : nbaDefensiveFilter === 'steals' ? player.Steals : player.BlockedShots} {nbaDefensiveFilter === 'rebounds' ? 'rebs' : nbaDefensiveFilter === 'steals' ? 'steals' : 'blks'}
      </li>
    ))}
  </ol>
</div>
          </>
        )}
      </div>
    </div>
  );
}
export default StatsPage;