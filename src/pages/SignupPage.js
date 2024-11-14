/**
 * @file SignupPage.js is our Signup page that will display a form for users to signup.
 * 
 * Resources:
 * https://www.geeksforgeeks.org/how-to-define-two-column-layout-using-flexbox/
 */

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from '../components/Register';
import '../styles/register.css';
import logo from '../img/logo.png';
import LoginModal from '../components/loginModal';
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching


function SignupPage() { 
    const Navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Access i18n for changing language
    // Manage the state for the login modal
    const [showModal, setShowModal] = useState(false);

    // Functions to handle the modal changes
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (        
        <div class="register">
            <div class="form">
                {/* This is the left side of the page containing the logo and sign-up form */}
                <span >
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="logo"
                        alt="Sports App Logo"
                        onClick={() => Navigate('/')}
                    />     
                </span>
                
                {/* Calling the register form component */}
                <center>
                    <br/>
                    <Register />
                </center>

            </div>
            <div class="link">
               {/* This is the right side of the page containing the login button for active users */}`
                <center>
                    <p class="titleRight">{t("signup_exists")}</p>
                    <Button style= {{borderRadius: '20px'}} variant="outline-light" onClick={handleShow}>{t("signup_exists_login")}</Button>
                </center>
                <LoginModal show={showModal} handleClose={handleClose} />
            </div>
        </div>  
    
    );
}

export default SignupPage;