/* 
@file loginModal.js is a file that will display a modal(pop-up) for the user to log in.

Resources:
https://react-bootstrap.netlify.app/docs/components/modal

*/

import React, { useRef, useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button} from 'react-bootstrap';
import {faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalStateContext } from './GlobalState';

import '../styles/loginModal.css';

// Regular expression for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginModal = ({ show, handleClose }) => {
    const Navigate = useNavigate();
    const userRef = useRef(); 

    // Function to handle the sign up button at the bottom is clicked
    const handleSignup = () => {
        handleClose();
        Navigate('/signup');
    }

    // State for the email validation and focus
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    
    // To set focus when component loads
    useEffect(() => {
        if(show){
            userRef.current.focus();
        }else{
            setValidEmail(false);
        }
    }, [show]);

    // To validate the email (anytime the email changes)
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    const {setIsLoggedIn, setCurrentUser} = useContext(GlobalStateContext);

    // Function to handle the log in form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email and password match a user in localStorage
        const user = users.find((user) => user.email === email && user.pwd === pwd);

        if (user) {
            alert(`Welcome back, ${user.fullname}!`);
            setIsLoggedIn({bool: true});
            setCurrentUser(user);
            handleClose();
            Navigate('/home');
        } else {
            alert('Invalid email or password');
        }
        
    }

    return (

        <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Body className="modalBody">
                <form onSubmit={handleSubmit}>
                    <br/>
                    <h1>Welcome Back!</h1>
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
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <br/>
                    <Button variant="light" type="submit" className="logButton">
                        Log In
                    </Button>
                    <p style={{textAlign: 'center'}}><br/>New? <span class="signupLink" onClick={() => handleSignup()}>Sign Up</span></p>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;