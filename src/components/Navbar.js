/**
 * @file Navbar.js is a file that contains the Navbar component for the Sports App.
 * 
 * Resources used:
 *  Setting up the Navbar help:
 *  https://www.youtube.com/watch?v=DTPERO1bl7w
 *  https://www.youtube.com/watch?v=o05ZP6_JQqE
 * 
 *  Documentation: 
 *  https://reactrouter.com/en/main/start/tutorial
 *  https://react-bootstrap.netlify.app/docs/getting-started/introduction/
 */

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import { GlobalStateContext } from './GlobalState';
import LoginModal from './loginModal';
import logo from '../img/logo.png';
import '../styles/navbar.css';

import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function NavbarBS() {
    const { t } = useTranslation(); // Access the translation function

    // State for the login modal
    const [showModal, setShowModal] = useState(false);

    // Functions to handle pop-up login modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const linkStyle = {
        fontSize: '1.3rem',
    };

    const { globalState, isLoggedIn } = useContext(GlobalStateContext);
    const navigate = useNavigate();
    
    // Function to handle the navigation to different pages when the user clicks on the navbar links
    const handleNavClick = (path) => { 
        navigate(path, { state: { sport: globalState.sport } });
    };

    // Function to handle the account icon click 
    // It will set the navigation to the account page if the user is logged in; otherwise, the login modal will show
    const handleAccountClick = () => {
        if (isLoggedIn.bool) {
            navigate('/account');
        } else {
            handleShow();
        }
    };

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand as="span" onClick={() => handleNavClick('/home')}>
                        <img
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Sports App Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link as="span" onClick={() => handleNavClick('/stats')} style={linkStyle} className="navbar-link">
                            {t('stats_nav')} {/* Use translation key for Stats */}
                        </Nav.Link>
                        <Nav.Link as="span" onClick={() => handleNavClick("/scores")} style={linkStyle} className="navbar-link">
                            {t('scores_nav')} {/* Use translation key for Scores */}
                        </Nav.Link>
                        <Nav.Link as="span" onClick={() => handleNavClick("/schedule")} style={linkStyle} className="navbar-link">
                            {t('schedule_nav')} {/* Use translation key for Schedule */}
                        </Nav.Link>
                        <Nav.Link as="span" onClick={() => handleNavClick('/home')} style={linkStyle} className="navbar-link">
                            {t('news_nav')} {/* Use translation key for News */}
                        </Nav.Link>
                        
                        {/* User Account Icon */}
                        <Nav.Link as="span" className="navbar-link" onClick={handleAccountClick} style={{ fontSize: '1.3rem', marginLeft: '15px' }}>
                            <FontAwesomeIcon icon={faUser}/>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <LoginModal show={showModal} handleClose={handleClose} />
        </>
    );
}

export default NavbarBS;
