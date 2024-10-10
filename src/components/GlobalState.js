/**
 * @file GlobalState.js is a file that contains the GlobalStateProvider component.
 *          It holds the global state (sport selection) of the application.
 * 
 * Reasources used:
 *  Help setting up the global state 
 *  Youtube: https://www.youtube.com/watch?v=lnL6gRkQ5g8 & copilot
 *  Articles I used: https://www.w3schools.com/react/react_usecontext.asp & https://4geeks.com/how-to/react-global-context 
 * 
 *  useContext Documentation: https://react.dev/reference/react/useContext#usage
 */

import {createContext, useState} from 'react';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = ({children}) => {
    const [globalState, setGlobalState] = useState({});

    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalStateContext.Provider>
    );
}