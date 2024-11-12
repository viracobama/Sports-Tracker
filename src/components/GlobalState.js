/**
 * @file GlobalState.js is a file that contains the GlobalStateProvider component.
 *          It holds the global state (sport selection) of the application.
 *                      - Current user login status and user information
 *                      - NBA and NFL teams (can be used for either or both)
 * 
 * Reasources used:
 *  Help setting up the global state 
 *  Youtube: https://www.youtube.com/watch?v=lnL6gRkQ5g8 & copilot
 *  Articles I used: https://www.w3schools.com/react/react_usecontext.asp & https://4geeks.com/how-to/react-global-context 
 * 
 *  useContext Documentation: https://react.dev/reference/react/useContext#usage
 */

import {createContext, useState, useEffect} from 'react';

export const GlobalStateContext = createContext({});
export const AuthContext = createContext();


export const GlobalStateProvider = ({children}) => {
    // Global state for the sport selection
    const [globalState, setGlobalState] = useState({sport: 'NFL'});

    // Global state for the user login status and current user
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Global context for the sports teams
    const [NBAteams, setNBATeams] = useState([]);
    const [NFLteams, setNFLTeams] = useState([]);
    const [Bothteams, setBothTeams] = useState([]);

    // Global context for the events (used for calendar)
    const [events, setEvents] = useState([]);

    // Global context for the removed teams from the favorite teams filter
    const [removedTeams, setRemovedTeams] = useState([]);

    //useEffect to fetch the NBA and NFL teams
    useEffect(() => {
        fetchNBATeams();
        fetchNFLTeams();
    }, []);

    //API call to populate the sports teams in NBA and add to the Bothteams state
    const fetchNBATeams = async () => {
        try {
            const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NBA");
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setNBATeams(data.teams);
            setBothTeams(prevTeams => [...prevTeams, ...data.teams]);
        } catch (error) {
            console.error("Failed to fetch NBA teams:", error);
        }
    };

    //API call to populate the sports teams in NFL and add to the Bothteams state
    const fetchNFLTeams = async () => {
        try {
            const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NFL");
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setNFLTeams(data.teams);
            setBothTeams(prevTeams => [...prevTeams, ...data.teams]);
        } catch (error) {
            console.error("Failed to fetch NFL teams:", error);
        }
    };


    return (
        <GlobalStateContext.Provider value={{
            globalState, 
            setGlobalState, 
            isLoggedIn, 
            setIsLoggedIn, 
            currentUser, 
            setCurrentUser,
            NBAteams,
            NFLteams,
            Bothteams,
            events,
            removedTeams,
            setRemovedTeams,
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
}
