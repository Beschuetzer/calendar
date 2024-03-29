import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

import {
    setShouldDisableSubmitButton,
    setShouldResetToastTimeout,
} from '../../modules/home';
import {getEndPoint} from "../../data/endPoints";
import {getSha256} from "../../helpers/helpers";
import {setEvents, setInvites} from "../../modules/calendar";

LoginForm.propTypes = {
    handleLoginSuccess: PropTypes.func,
    handleLoginFail: PropTypes.func,
    shouldDisableSubmitButton: PropTypes.bool,
};

const DEFAULT_INPUT_VALUE = "test";

function LoginForm({
                       dispatch,
                       handleLoginSuccess,
                       handleLoginFail,
                       shouldDisableSubmitButton,
                   }) {
    const [username, setUsername] = useState(DEFAULT_INPUT_VALUE);
    const [password, setPassword] = useState(DEFAULT_INPUT_VALUE);

    const handleSubmit = (e) => {
        const loginEndPoint = getEndPoint("login");
        e.preventDefault();
        getSha256(password)
            .then(hashedPassword => {
                const urlToSend = `
               ${loginEndPoint.url}?username=${username}&hashedPassword=${hashedPassword}
        `
                fetch(urlToSend, {
                    method: loginEndPoint.method,
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        if (json.error) return handleLoginFail(json.message);
                        handleLoginSuccess(json.user);
                        dispatch(setEvents(json.events));
                        dispatch(setInvites(json.invites));
                    })
                    .catch(msg => {
                        handleLoginFail(msg)
                    })
            })
            .catch(err => {
                handleLoginFail(err?.message ? err.message : err);
            })

            dispatch(setShouldResetToastTimeout(true));
            dispatch(setShouldDisableSubmitButton(true));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            value={username}
                            type="text"
                            placeholder="Enter Your Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Text>
                        Don't have an account?&nbsp;&nbsp;
                        <Link to={"/register"}>
                            Click Here
                        </Link>
                    </Form.Text>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <Button disabled={shouldDisableSubmitButton} className={"w-100"} variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        shouldDisableSubmitButton: state.login.shouldDisableSubmitButton,
    }
}

export default connect(mapStateToProps)(LoginForm);
