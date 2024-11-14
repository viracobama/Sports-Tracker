import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';

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

    const activeLinkStyle = {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#4CB2D5', // Highlight color for the active link
        borderBottom: '2px solid', // Add a line underneath the active link
    };

    const { globalState, isLoggedIn } = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    
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
                        <Nav.Link 
                            as="span" 
                            onClick={() => handleNavClick('/stats')} 
                            style={location.pathname === '/stats' ? activeLinkStyle : linkStyle} 
                            className={`navbar-link ${location.pathname === '/stats' ? 'navbar-link-active' : ''}`}
                        >
                            {t('stats_nav')} {/* Use translation key for Stats */}
                        </Nav.Link>
                        <Nav.Link 
                            as="span" 
                            onClick={() => handleNavClick("/scores")} 
                            style={location.pathname === '/scores' ? activeLinkStyle : linkStyle} 
                            className={`navbar-link ${location.pathname === '/scores' ? 'navbar-link-active' : ''}`}
                        >
                            {t('scores_nav')} {/* Use translation key for Scores */}
                        </Nav.Link>
                        <Nav.Link 
                            as="span" 
                            onClick={() => handleNavClick("/schedule")} 
                            style={location.pathname === '/schedule' ? activeLinkStyle : linkStyle} 
                            className={`navbar-link ${location.pathname === '/schedule' ? 'navbar-link-active' : ''}`}
                        >
                            {t('schedule_nav')} {/* Use translation key for Schedule */}
                        </Nav.Link>
                        <Nav.Link 
                            as="span" 
                            onClick={() => handleNavClick('/home')} 
                            style={location.pathname === '/home' ? activeLinkStyle : linkStyle} 
                            className={`navbar-link ${location.pathname === '/home' ? 'navbar-link-active' : ''}`}
                        >
                            {t('news_nav')} {/* Use translation key for News */}
                        </Nav.Link>
                        
                        {/* User Account Icon */}
                        <Nav.Link 
                            as="span" 
                            className="navbar-link" 
                            onClick={handleAccountClick} 
                            style={{ fontSize: '1.3rem', marginLeft: '15px' }}
                        >
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