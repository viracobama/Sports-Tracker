/**
 * @file AccountPage.js is our Account page that will display account information IF a user is logged in. 
 * Otherwise, it will show the login modal.
 * 
 * I will show users current favorite teams and allow them to add more favorite teams.
 * -  plus remove them from their favorites.
 * 
 * - Imports the Navbar component to display the navigation bar.
 */

import React, {useContext, useState, useEffect, axios} from 'react';
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


function AccountPage() {

  // Getting the sport selected, current user, login status, and sport teams from the GlobalStateContext
  const {currentUser, setCurrentUser, setIsLoggedIn, Bothteams} = useContext(GlobalStateContext);
  const Navigate = useNavigate();

  // State for the search term to filter teams
  const [searchTerm, setSearchTerm] = useState('');
  // Stores the search results
  const [searchResults, setSearchResults] = useState([]);
  

  const teams = Bothteams;

  // useEffect to filter the teams based on the search term each time the term changes.
  useEffect(() => {
    //Removing spaces and converting to lowercase for a better search
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    //Filtering the Bothteams list based on the search term
    if(trimmedSearchTerm){
      const results = teams.filter(team =>
            team.strTeam.trim().toLowerCase().includes(trimmedSearchTerm)
      );
      setSearchResults(results);
    }else{
      setSearchResults([]);
    }    
    
  }, [searchTerm]);

  // Function to handle the search bar change and update the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  } 

  // Function to handle adding a team to the user's favorite teams
  const handleAddFavoriteTeam = (team) => {

    //Checking to see if the team is already in the list
    let alreadyInList = false;

    for(let favTeam of currentUser.favTeams){
      if(favTeam.strTeam === team.strTeam){
        alreadyInList = true;
        break;
      }
    }

    //If the team is not in the list, add it
    if (!alreadyInList) {
      
      const updatedUser = {
        ...currentUser,
        favTeams: [...currentUser.favTeams, team]
      };
      setCurrentUser(updatedUser);
  
      // Retrieve all users from localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Find the index of the current user in the users array
      const userIndex = users.findIndex(user => user.email === currentUser.email);
  
      // Update the user in the users array
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }
      
      // Save the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
   
    }
  } 

  // Function to handle removing a team from the user's favorite teams
  const handleRemoveFavoriteTeam = (team) => {
    // Update the current user's favorite teams
    const updatedUser = {
      ...currentUser,
      favTeams: currentUser.favTeams.filter(favTeam => favTeam.strTeam !== team.strTeam)
    };
    setCurrentUser(updatedUser);

    // Retrieve all users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the index of the current user in the users array
    const userIndex = users.findIndex(user => user.email === currentUser.email);

    // Update the user in the users array
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Function to handle the sign out button click
  // I will set the isLoggedIn state to false and the currentUser state to null
  const handleButtonClick = () => {
    setIsLoggedIn({bool: false});
    setCurrentUser(null);
    Navigate('/');
  }

  return (
    <div>
      <NavbarBS />
      <br></br>
      <Container>
        <Row>
          <Col sm={5} className="teams scrollable-column">
          {/* This is the left side where we display favorite teams */}
          <img 
            src={userImg} 
            alt="account" 
            width="100"
            height="100"/>

          <h5><br/>Your Favorite Teams:</h5>
          <ul>
              {currentUser.favTeams && currentUser.favTeams.map((team, index) => (
                <li id="favTeams" key={index}>
                  <FontAwesomeIcon 
                    id = "icon"
                    icon={faHeart} 
                    style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px' }} 
                    onClick={() => handleRemoveFavoriteTeam(team)} 
                  />
                  {team.strTeam} ({team.strLeague})</li>
              ))}
          </ul>
          <br/>
          {/* Search bar for add teams to favorites. */}
          <p>Find a sports team to add <br/>to favorites:</p>
          <div className="search">
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ul>
              {searchResults.slice(0, 5).map((team, index) => (
                <li key={index} onClick={() => handleAddFavoriteTeam(team)}>
                  <FontAwesomeIcon 
                    id = "icon"
                    icon={faHeartRegular} 
                    style={{ color: 'lightblue', cursor: 'pointer', marginLeft: '10px' }} 
                    onClick={() => handleRemoveFavoriteTeam(team)} 
                  />
                  {team.strTeam} ({team.strLeague})
                </li>
              ))}
            </ul>
          </div>
          </Col>

          {/* Col to add spacing */}
          <Col sm={1}></Col>

          <Col sm={6} className="accountInfo">
          {/* This is the right side where we display account information */}
          <br/>
          <div className="language">
            <p>Switch to Spanish</p>
            <Form.Check
              type="switch"
              id="custom-switch"
            />
          </div><br/><br/>
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