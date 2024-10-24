/**
 * @file sportSelection.js is a file that contains the SportSelection component for the Sports App.
 *          the component is used to select the sport that the user wants to view.
 * 
 * Reasources used:
 *  Extra help/example with useNavigate: https://www.youtube.com/watch?v=UWxLGvToiXU
 *  useLocation Documentation: https://reactrouter.com/en/main/hooks/use-location
 */

import React, { useContext} from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateContext } from './GlobalState';


function SportSelection() {

    const buttonStyle = {
        width: '50px',
        height: '60px',
        fontsize: '1.5rem', 
        margin: '10px',
      };

    const {setGlobalState, currentUser, isLoggedIn} = useContext(GlobalStateContext);

    // This function is called when the user clicks on the sport selection buttons
    // It sets the global state to the sport that the user selects and sets the last sport for the current user
    const handleButtonClick = (sport) => {
        setGlobalState({sport: sport});
        if(isLoggedIn.bool){
            currentUser.lastSport = sport;
        }
    }
    
    return (
        <div>
            <ButtonGroup vertical> 
                <Button style={buttonStyle} onClick={() => handleButtonClick("NFL")}>NFL</Button>
                <Button style={buttonStyle} onClick={() => handleButtonClick("NBA")}>NBA</Button>
            </ButtonGroup>
      
        </div>
    );
}

export default SportSelection;