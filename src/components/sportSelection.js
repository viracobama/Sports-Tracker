/**
 * @file sportSelection.js is a file that contains the SportSelection component for the Sports App.
 *          the component is used to select the sport that the user wants to view.
 * 
 * Reasources used:
 *  Extra help/example with useNavigate: https://www.youtube.com/watch?v=UWxLGvToiXU
 *  useLocation Documentation: https://reactrouter.com/en/main/hooks/use-location
 */

import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateContext } from './GlobalState';
import '../i18n.js'; // for language change
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching


function SportSelection() {
    const { t } = useTranslation(); // Access the translation function
    const buttonStyle = {
        width: '100px',
        height: '60px',
        fontsize: '1.5rem', 
        margin: '10px',
        backgroundColor: '#C1E0EB',
        border: '1px solid #C1E0EB',
        borderRadius: '5px',
        color: 'black'
    };

    const selectedButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#4CB2D5',
        border: '1px solid #4CB2D5',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        transform: 'translateY(2px)',
    };

    const {globalState, setGlobalState, currentUser, isLoggedIn} = useContext(GlobalStateContext);

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
            <h6>{t("choose_sport")}</h6>
            <ButtonGroup vertical> 
                <Button style={globalState.sport === 'NFL' ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick("NFL")}>NFL</Button>
                <Button style={globalState.sport === 'NBA' ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick("NBA")}>NBA</Button>
            </ButtonGroup>
      
        </div>
    );
}

export default SportSelection;