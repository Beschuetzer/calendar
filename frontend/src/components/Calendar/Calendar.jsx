import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setShouldShowWelcome, fetchUserEvents } from '../../modules/calendar';
import EventsManager from './Events/EventsManager';

function Calendar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hasUserRegistered = useSelector((state) => state.register.registrationResult.username)
    const shouldShowWelcome = useSelector((state) => state.calendar.shouldShowWelcome);
    const currentUser = useSelector((state) => state.login.currentUser);
    const username = useSelector((state) => state.login.currentUser ? state.login.currentUser : '');
    const ALERT_DURATION = 10000;
    let ALERT_TIMEOUT = -1;

    const getAlertMessage = () => {
        if (hasUserRegistered) return (
            <span>
                Registration Successful! You will henceforth be known as {<span className={"fw-bold"}>'{username}'</span>}!
            </span>
        )

        return (
            <span>
                Welcome back {<span className={"fw-bold"}>{username}</span>}!
            </span>
        )
    }

    useEffect(() => {
        if (!currentUser) navigate("/")

        if (ALERT_TIMEOUT === -1) {
            setTimeout(() => {
                dispatch(setShouldShowWelcome(false))
            }, ALERT_DURATION);
        }

        dispatch(fetchUserEvents(currentUser));
    }, [])

    return (
        <>
            <Alert className={`mt-3 ${shouldShowWelcome ? 'visible' : 'invisible'}`} show={true} variant="success">{getAlertMessage()}</Alert>
            {/*
                You can also use the Tab components to create ARIA compliant tabbable interfaces with the <ListGroup> component.
                Swap out the <Nav> component for the list group and you are good to go.
            */}

           <EventsManager/>
        </>
    );
}

export default React.memo(Calendar);