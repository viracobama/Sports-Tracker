/*
@file Register.js is a file that will allow users to register/signup for the app.

Resources:
https://docs.fontawesome.com/v5/web/use-with/react

useRef: https://reactjs.org/docs/hooks-reference.html#useref
A hook that can be referenced to store changeable values that last for the lifetime of the component.

useEffect - to run task when changes happens

FontAwesomeIcons font and css toolkit for icons

faInfoCircle we will use for the error msgs to give the user more information

https://fontawesome.com/v4/icon/info-circle
https://docs.fontawesome.com/v5/web/use-with/react
https://legacy.reactjs.org/docs/hooks-reference.html#useref
https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
*/


import { useRef, useState, useEffect, useContext} from 'react';
import {faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { GlobalStateContext } from './GlobalState';


// Validating name, email and password input.
// Email has to follow the general pattern of an email address.
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//Full name must be 3-23 characters long and can only contain letters.
const NAME_REGEX = /^[A-z ]{3,23}$/;

// Password requires one upper case, one lower case, one digit, one special character, and can be 8-24 characters long.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef(); // To keep the user input when component loads
    const errRef = useRef(); 

    //full name validation
    const [fullname, setFullName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    
    // Email validation
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    // Password validation
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // Confirm password validation
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const[errMsg, setErrMsg] = useState('');

    const {setCurrentUser, setIsLoggedIn, setGlobalState} = useContext(GlobalStateContext);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // To set focus when component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // To validate the email (anytime the email input changes)
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        //testing
        console.log(result);
        setValidEmail(result);
    }, [email]);

    // To validate the full name whenever the full name input changes
    useEffect(() => {
        const result = NAME_REGEX.test(fullname);
        setValidName(result);
    }, [fullname]);

    // To validate the password whenever either password fields change
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        //testing
        console.log(result);
        setValidPwd(result);
        
        // This is where we get confirmation
        const match = (pwd === matchPwd);
        setValidMatch(match);
    
    }, [pwd, matchPwd]);

    // To display error message whenever any state is changed
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);

    const Navigate = useNavigate();

    // This function will handle the form submission to register a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Default values for the user
        const favTeams = [];
        const lastSport = '';
        const d = new Date();
        const monthDate = month[d.getMonth()];
        let year = d.getFullYear();
    
        // Creating a user object
        const user = {
            fullname,
            email,
            pwd,
            favTeams,
            lastSport,
            monthDate,
            year
          };
      
        // Get the users from local storage or an empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email is already registered
        const userExists = users.some((user) => user.email === email);

        if (userExists) {
            alert('Email already registered');
        } else {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert(`you are now registered. Welcome, ${user.fullname}!`);
            setGlobalState({sport: user.lastSport});
            setIsLoggedIn({bool: true});
            setCurrentUser(user);
            Navigate('/home');
        }
        
    }


    return (
        <section>
            {/* this will hold the error message when one pops up 
            aria-live: this attribute makes sure the error msg is shown immediately without waiting for the user to focus on it*/}
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    
            <h1 style={{ textAlign: 'left' }}>Hello!</h1>
            
            <form onSubmit={handleSubmit}>
                {/* FULL NAME INPUT */}
                <label htmlFor='fullname'>
                    Full Name
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !fullname ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="fullname"
                    required
                    autoComplete="off"
                    onChange={(e) => setFullName(e.target.value)}
                    aria-invalid={validName ? "false" : "true"} 
                    aria-describedby= "nameNote" //this gives the description of the error
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)} // when the user leaves the input field

                />
                {/* This info circle will display if the user is in the input field, the full name has an input, and if the full name is invalid */}
                <p id="nameNote" className={nameFocus && fullname && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Full name must be 3 to 23 characters long.<br/>
                    Can only contain letters.
                </p>
                    
                {/* EMAIL INPUT FIELD */}
                <label htmlFor='email'>
                    Email
                    {/* faCheck is the green check mark when the input is valid */}
                    <span className = {validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    
                    {/* faTimes is the red x when the input is invalid or empty */}
                    <span className = {validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="email"
                    required
                    ref={userRef}
                    autoComplete="off" // to turn off the suggestions from previous use
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    aria-invalid={validEmail ? "false" : "true"} // validEmail will be TRUE when the component loads
                    aria-describedby= "emailNote" //this gives the description of the error
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)} // when the user leaves the input field

                />

                {/* This will display if the user in in the input field, the user has an input, and if the username is invalid */}
                <p id="emailNote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email must be in vaild format.
                </p>

                {/* PASSWORD INPUT FIELD */}
                <label htmlFor='password'> 
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='passwordNote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <p id="passwordNote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Password must be 8 to 24 characters long.<br/>
                    Must contain at least: one uppercase letter, <br/>
                    one lowercase letter, one digit, and one ! @ # $ %.
                </p>
                

                {/* CONFIRM PASSWORD INPUT FIELD */}
                <label htmlFor='confirmPassword'>
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    required
                    onChange={(e) => setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='confirmNote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmNote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Passwords must match.
                </p>
                    
                {/* SUBMIT BUTTON */}
                <button disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}
                >Sign Up</button>
              

            </form>

        </section>
    );
}

export default Register;
