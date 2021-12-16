import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginToast from "./LoginToast";
import { connect } from "react-redux";
import {
    setShouldResetToastTimeout,
    setShouldShowToast,
} from '../../modules/home';

import { handleLoginSuccess, handleLoginFailure } from '../../modules/home'
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Login(
) {
    const dispatch = useDispatch();
    const shouldShowToast = useSelector(state => state.login.shouldShowToast);
    const shouldResetToastTimeout = useSelector(state => state.login.shouldResetToastTimeout);
    const toastHeader = useSelector(state => state.login.toastHeader);
    const toastMessage = useSelector(state => state.login.toastMessage);
    const toastBackgroundColor = useSelector(state => state.login.toastBackgroundColor);
    const toastTextColor = useSelector(state => state.login.toastTextColor);

    const navigate = useNavigate();
    const SHOW_TOAST_DURATION = 3000;
    const showToastFadeTimeoutLocal = useRef(-1);

    function redirectToCalendar(username) {
        dispatch(handleLoginSuccess(username));
        navigate('/calendar');
    }

    function handleLoginFail(exception) {
        dispatch(handleLoginFailure(exception.error));
    }

    const setToastBooleans = useCallback((value) => {
        dispatch(setShouldResetToastTimeout(value));
        dispatch(setShouldShowToast(value));
    }, [dispatch])

    useEffect(() => {
        showToastFadeTimeoutLocal.current = setTimeout(() => {
            setToastBooleans(false);
        }, SHOW_TOAST_DURATION)

        return (() => {
            clearInterval(showToastFadeTimeoutLocal.current);
        })
    }, [shouldShowToast, setToastBooleans]);

    useEffect(() => {
        if (shouldResetToastTimeout) {
            clearInterval(showToastFadeTimeoutLocal.current);
            setToastBooleans(false);
        }
    }, [shouldResetToastTimeout, setToastBooleans])

    return (
        <React.Fragment>
            <Row>
                <Col className={"mt-3"}>
                    <section>
                        <header>
                            <h5>Please Login</h5>
                            <LoginForm handleLoginSuccess={redirectToCalendar} handleLoginFail={handleLoginFail} />
                        </header>
                    </section>
                </Col>
            </Row>
            <LoginToast
                shouldShowToast={shouldShowToast}
                position={"middle-center"}
                bgColor={toastBackgroundColor}
                textColor={toastTextColor}
                header={toastHeader}
            >
                {toastMessage}
            </LoginToast>
            <InputGroup></InputGroup>
        </React.Fragment>
    );
}

export default React.memo(Login);