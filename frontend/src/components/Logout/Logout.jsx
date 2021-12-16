import React, {useEffect, useState, useRef} from 'react';
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from 'react-router';

function Logout() {
    const REDIRECT_DELAY = 5000;
    const COUNTDOWN_INTERVAL = 1000;

    const navigate = useNavigate();
    const [countDownTimer, setCountDownTimer] = useState(REDIRECT_DELAY);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCountDownTimer(countDownTimer - COUNTDOWN_INTERVAL);
            if (countDownTimer <= 0) {
                navigate('/');
            }
        }, COUNTDOWN_INTERVAL)

        return () => {
            clearTimeout(timeout);
        }
    }, [countDownTimer])

    return (
        <Alert className="mt-3" variant="success">You have successfully logged out! Returning to home
            in {countDownTimer / 1000} seconds</Alert>
    );
}

export default Logout;