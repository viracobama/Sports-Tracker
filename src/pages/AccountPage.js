/**
 * @file AccountPage.js is our Account page that will display account information IF a user is logged in. 
 * Otherwise, it will show the login modal.
 * 
 * - Imports the Navbar component to display the navigation bar.
 */

import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarBS from '../components/Navbar.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import userImg from '../img/userImg.png';
import '../styles/account.css';


function AccountPage() {

  const {currentUser, setCurrentUser, setIsLoggedIn} = useContext(GlobalStateContext);
  const Navigate = useNavigate();

  // Function to handle the sign out button click
  // I will set the isLoggedIn state to false and the currentUser state to null
  const handleButtonClick = () => {
    console.log("Signing out");
    setIsLoggedIn({boo: false});
    setCurrentUser(null);
    Navigate('/');
  }

  return (
    <div>
      <NavbarBS />
      <br></br>
      <Container>
        <Row>
          <Col sm={4} className="teams">
          {/* This is the left side where we display favorite teams */}
          <img 
            src={userImg} 
            alt="account" 
            width="100"
            height="100"/>
          <h5><br/>Your Favorite Teams:</h5>
          <ul>
              {currentUser.favoriteTeams && currentUser.favoriteTeams.map((team, index) => (
                <li key={index}>{team}</li>
              ))}
          </ul>
          <br/>
          {/* Search bar for add teams to favorites. TODO implement search and adding to favorites */}
          <p>Find a sports team to add <br/>to favorites:</p>
          <div className="search">
            <input
              type="search"
              placeholder="Search..."
              
            />
            <Button variant="primary">Search</Button>
          </div>
          </Col>

          <Col sm={1}></Col>

          <Col sm={7} className="accountInfo">
          {/* This is the right side where we display account information */}
          <label>Full Name</label>
          <input
              type="text"
              value = {currentUser.fullname}
              readonly
          />
          <label>Email</label>
          <input
              type="text"
              value = {currentUser.email}
              readonly
          />

          <h5><br/>Been a loyal member since {currentUser.monthDate} {currentUser.year}!</h5><br/>
          
          <Button className="signout" variant="danger" onClick={() => handleButtonClick()}>Sign Out</Button>
          
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountPage;