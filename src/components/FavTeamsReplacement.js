/* This component is a substitute for the favorite teams filter for when the user is not logged in */

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

//Used for the login button
import LoginModal from '../components/loginModal';

function FavTeamsReplacement() {
     
    // State for the login modal
    const [showModal, setShowModal] = useState(false);

    // Functions to handle the pop-up login modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
         <>
            <center>
                <p class="titleRigt">Login/SignUp to filter data with your favorite teams.</p>
                <Button onClick={handleShow} style= {{borderRadius: '20px', width: '100px'}} variant="outline-primary">Log in</Button>
            </center>
            <LoginModal show={showModal} handleClose={handleClose} />
        </>
    );
}

export default FavTeamsReplacement;