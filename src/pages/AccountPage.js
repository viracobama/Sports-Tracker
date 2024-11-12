/**
 * @file AccountPage.js displays account information if a user is logged in, otherwise shows the login modal.
 */

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import NavbarBS from '../components/Navbar.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import userImg from '../img/userImg.png';
import '../styles/account.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function AccountPage() {
  const { currentUser, setCurrentUser, setIsLoggedIn, Bothteams } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Access i18n for changing language

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [language, setLanguage] = useState(i18n.language); // Initialize with current language

  const teams = Bothteams;

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm) {
      const results = teams.filter(team =>
        team.strTeam.trim().toLowerCase().includes(trimmedSearchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFavoriteTeam = (team) => {
    let alreadyInList = false;
    for (let favTeam of currentUser.favTeams) {
      if (favTeam.strTeam === team.strTeam) {
        alreadyInList = true;
        break;
      }
    }

    if (!alreadyInList) {
      const updatedUser = {
        ...currentUser,
        favTeams: [...currentUser.favTeams, team]
      };
      setCurrentUser(updatedUser);

      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const handleRemoveFavoriteTeam = (team) => {
    const updatedUser = {
      ...currentUser,
      favTeams: currentUser.favTeams.filter(favTeam => favTeam.strTeam !== team.strTeam)
    };
    setCurrentUser(updatedUser);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleButtonClick = () => {
    setIsLoggedIn({ bool: false });
    setCurrentUser(null);
    navigate('/');
  };

  // Handle language toggle
  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage); // Update the local state to reflect the language change
  };

  return (
    <div>
      <NavbarBS />
      <br />
      <Container>
        <Row>
          <Col sm={5} className="teams scrollable-column">
            <img 
              src={userImg} 
              alt="account" 
              width="100"
              height="100"
            />

            <h5><br/>{t('favorite_teams')}</h5>
            <ul>
              {currentUser.favTeams && currentUser.favTeams.map((team, index) => (
                <li id="favTeams" key={index}>
                  <FontAwesomeIcon 
                    id="icon"
                    icon={faHeart} 
                    style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px' }} 
                    onClick={() => handleRemoveFavoriteTeam(team)} 
                  />
                  {team.strTeam} ({team.strLeague})
                </li>
              ))}
            </ul>
            <br />
            <p>{t('find_team')}</p>
            <div className="search">
              <input
                type="search"
                placeholder={t('find_team')}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
                {searchResults.slice(0, 5).map((team, index) => (
                  <li key={index} onClick={() => handleAddFavoriteTeam(team)}>
                    <FontAwesomeIcon 
                      id="icon"
                      icon={faHeartRegular} 
                      style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px' }} 
                    />
                    {team.strTeam} ({team.strLeague})
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col sm={1}></Col>

          <Col sm={6} className="accountInfo">
            <br />
            <div className="language">
              <p>{language === 'en' ? t('switch_language') : 'Switch to English'}</p>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={language === 'es'}
                onChange={handleLanguageToggle}
              />
            </div>
            <br /><br />
            <label>{t('full_name')}</label>
            <input
              type="text"
              value={currentUser.fullname}
              readOnly
            />
            <label>{t('email')}</label>
            <input
              type="text"
              value={currentUser.email}
              readOnly
            />

            <h5><br />{t('member_since')} {currentUser.monthDate} {currentUser.year}!</h5><br />
          
            <Button className="signout" variant="danger" onClick={handleButtonClick}>{t('sign_out')}</Button>
          
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountPage;
