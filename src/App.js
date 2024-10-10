/**
 * This is the landing page of the application.
 * 
 * Video that helped me set up the useNavigate passing sport values https://www.youtube.com/watch?v=kibtFP9wfLM
 */

import React, {useContext} from 'react';
import LandingNavbar from './components/landingNavbar';
import background from './img/homeImg.jpg';
import './App.css';

//These imports are from the bootstrap library and they are used for the sport selecton buttons
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from './components/GlobalState';


function App() {

  //Background image for the landing page
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };
  
  //Button CSS for the sport selection buttons
  const buttonStyle = {
    width: '600px', 
    height: '60px', 
    fontSize: '1.5rem', 
    margin: '10px', 
  };
  
  const Navigate = useNavigate();
  const {setGlobalState} = useContext(GlobalStateContext);

  /**
   * This function is called when the user clicks on the sport selection buttons to 
   * navigate to the home page and set the global state to the sport that the user selects
   * 
   * @param {*} sport is the name of the sport that the user selects to filter the data
   */
  const handleButtonClick = (sport) => {
    setGlobalState({sport: sport});
    Navigate('/home');
  }

  return (
    <div className="App">
      <LandingNavbar />
      <div style={backgroundStyle}>
        <header class = "App-header">Create Your <br></br> Perfect Experience!</header>
        <div>
            <ButtonGroup vertical> 
                <Button style = {buttonStyle} onClick={() => handleButtonClick("NFL")}>NFL</Button>
                <Button style = {buttonStyle} onClick={() => handleButtonClick("NBA")}>NBA</Button>
            </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
