import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/home';
import { setRegistrationResult } from '../../modules/register';

import { useSelector } from 'react-redux';

function Navigation({
    text,
    children,
}) {

    const [logoutClass, setLogoutClass] = useState("d-none");
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.login.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setRegistrationResult({}))
    }

    const renderLogoutToolTip = (props) => {
        return (
            <Tooltip {...props} id={"logout-tooltip"}>
                Logout
            </Tooltip>
        )
    }

    const renderHomeToolTip = (props) => {
        return (
            <Tooltip {...props} id={"home-tooltip"}>
                Go Home
            </Tooltip>
        )
    }

    useEffect(() => {
        setLogoutClass(currentUser ? "" : "d-none");
    }, [currentUser])

    return (
        <Navbar variant={"dark"} bg={"dark"} expand={"sm"}>
            <Container>
                <Row>
                    <Col xs={"auto"}>
                        <Stack gap={0}>
                            <OverlayTrigger
                                placement={"bottom"}
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderHomeToolTip}
                            >
                                <Navbar.Brand className={"mb-0 pb-0"} >
                                    <Link to={"/"}>{text}</Link>
                                </Navbar.Brand>
                            </OverlayTrigger>
                            <Navbar.Text className={"mt-0 pt-0"}>
                                {children}
                            </Navbar.Text>
                        </Stack>
                    </Col>
                </Row>
                <Navbar.Toggle />
                <Navbar.Collapse className={`${logoutClass} justify-content-end`}>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderLogoutToolTip}
                    >
                        <Navbar.Text className={`${logoutClass}`} overlay={<Tooltip>Logout</Tooltip>}>
                            Signed in as: <Link to={"/logout"} onClick={handleLogout}>{currentUser}</Link>
                        </Navbar.Text>
                    </OverlayTrigger>,

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(Navigation);