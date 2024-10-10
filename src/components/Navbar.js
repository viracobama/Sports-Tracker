/**
 * @file Navbar.js is a file that contains the Navbar component for the Sports App.
 * 
 * Reasources used:
 *  Setting up the Navbar help:
 *  https://www.youtube.com/watch?v=DTPERO1bl7w
 *  https://www.youtube.com/watch?v=o05ZP6_JQqE
 * 
 *  Documentation: 
 *  https://reactrouter.com/en/main/start/tutorial
 *  https://react-bootstrap.netlify.app/docs/getting-started/introduction/
 */

import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/sports.png';
import '../index.css';
import React, {useState, useContext} from 'react';
import { GlobalStateContext } from './GlobalState';
import { useNavigate } from 'react-router-dom';

function NavbarBS() {


    const linkStyle = {
        fontSize: '1.3rem',
    };

    const {globalState} = useContext(GlobalStateContext);
    const Navigate = useNavigate();
    
    const handleNavClick = (path) => { 
        Navigate(path, {state: {sport: globalState.sport}});
    }

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
                {/* I kept Nav.Link for the bootstrap formatting but added the as="span" to convert to a <span> so it lets me to use Navigate in the "handleNavClick" */}
                <Nav.Link as="span" onClick={() => handleNavClick('/home')} style={linkStyle} className="navbar-link">Home</Nav.Link>
                <Nav.Link as="span" onClick={() => handleNavClick('/stats')} style={linkStyle} className="navbar-link">Stats</Nav.Link>
                <Nav.Link as="span" onClick={() => handleNavClick("/scores")} style={linkStyle} className="navbar-link">Scores</Nav.Link>
                <Nav.Link as="span" onClick={() => handleNavClick("/schedule")} style={linkStyle} className="navbar-link">Schedule</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>
  );
}

export default NavbarBS;
