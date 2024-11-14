/**
 * @file landingNavbar.js is a file that contains the Navbar component for the initial landing page.
 */

import React, { useState } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../img/logo.png';
import '../styles/navbar.css';
import LoginModal from './loginModal';
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function LandingNavbar() {
    const { t } = useTranslation(); // Access the translation function
    // State for the login modal
    const [showModal, setShowModal] = useState(false);

    // Functions to handle the pop-up login modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    const linkStyle = {
        fontSize: '1.3rem',
    };

    return (
        <>
        <Navbar bg="light">
            <Container>
            <Navbar.Brand href="/home">
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Sports App Logo"
                />
            </Navbar.Brand>
            <Nav className="justify-content-end">
                <Nav.Link onClick={handleShow} style={linkStyle} className="navbar-link">{t('landing_login')}</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <LoginModal show={showModal} handleClose={handleClose} />
        </>
  );
}

export default LandingNavbar;
