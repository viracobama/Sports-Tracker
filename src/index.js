/**
 * This is one of the main files for the application. 
 * It is responsible for rendering the application to the 
 * router element passed using ReactDOM and RouterProvider.
 * -  imports the pages to be used in the router.
 * 
 * -  GlobalStateProvider wraps the RouterProvider allowing the global state (sport selection)
 * to be accessible throughout the entire application.
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

/**
 * Importing the router functions to be used for navigativing the pages
 */
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/**
 * Importing the pages to be used in the router
 */
import App from './App';
import ScoresPage from './pages/ScoresPage';
import StatsPage from './pages/StatsPage';
import SchedulePage from './pages/SchedulePage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';

/**
 * Importing the GlobalStateProvider to be used for the global state (sport selection)
 */
import { GlobalStateProvider } from './components/GlobalState';

/**
 * Page routing using the createBrowserRouter function
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "scores",
    element: <ScoresPage/>,
  },
  {
    path: "schedule",
    element: <SchedulePage/>,
  },
  {
    path: "stats",
    element: <StatsPage/>,
  },
  {
    path: "home",
    element: <HomePage/>,
  },
  {
    path: "signup",
    element: <SignupPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStateProvider>
    <RouterProvider router={router} />
  </GlobalStateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
