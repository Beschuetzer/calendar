import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { handleLoginSuccess, handleLoginFailure } from '../../modules/home'
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';

function Login(
) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function redirectToCalendar(userObj) {
        console.log("redirecting")
        dispatch(handleLoginSuccess(userObj));
        navigate('/calendar');
    }

    function handleLoginFail(message) {
        dispatch(handleLoginFailure(message));
    }

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
            <InputGroup></InputGroup>
        </React.Fragment>
    );
}

export default React.memo(Login);