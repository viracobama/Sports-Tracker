/**
 * @file landingNavbar.js is a file that contains the Navbar component for the initial landing page.
 */

import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/sports.png';
import '../index.css';
import React, {useState} from 'react';

function LandingNavbar() {


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
                <Nav.Link href="/signup" style={linkStyle} className="navbar-link">SignUp or SignIn</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>
  );
}

export default LandingNavbar;
