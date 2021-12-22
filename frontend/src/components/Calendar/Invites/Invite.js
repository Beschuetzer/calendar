import React, {useState, useEffect} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {setIsAttendingOnInvite, getInviteDetails} from "../../../modules/calendar";
import {useDispatch} from "react-redux";



function Invite({invite}) {
    const dispatch = useDispatch();
    const [shouldShowButtons, setShouldShowButtons] = useState(invite.isAttending === null);

    const renderAcceptAndDeclineButtons = () => {
        if (!invite) return null;
        if (shouldShowButtons) return (
            <Row>
                <Col className={"text-center"}>
                    <Button disabled={invite.isAttending} variant={"success"} onClick={(e) => handleButtonClick(e, true)}>Accept</Button>
                </Col>
                <Col className={"text-center"}>
                    <Button disabled={!invite.isAttending} variant={"danger"} onClick={(e) => handleButtonClick(e, false)}>Decline</Button>
                </Col>
            </Row>
        )
    }

    const handleButtonClick = (e, value) => {
        e.stopPropagation();
        const promise = dispatch(setIsAttendingOnInvite(invite, value));
        promise.then(isSuccessful => {
            if (isSuccessful) setShouldShowButtons(false);
            else setShouldShowButtons(true);
        });
    }

    const handleExpandClick = (e, value) => {
        e.stopPropagation();
        setShouldShowButtons(value);
        dispatch(getInviteDetails(invite, value))
    }

    const renderItem = () => {
        return (<ListGroup.Item action onClick={(e) => handleClick(e)} variant={invite.isAttending ? "success" : "danger"} as={"li"} style={{cursor: "pointer"}}>
            <Row>
                <Col >
                    <h5 className={"text-dark"}>{invite.eventTitle}</h5>
                </Col>
                <Col xs={"auto"} onClick={(e) => shouldShowButtons ? handleExpandClick(e, false) : handleExpandClick(e, true)}>
                    <span dangerouslySetInnerHTML={{__html: shouldShowButtons ? '&minus;' : '&plus;'}}></span>
                </Col>
                {renderAcceptAndDeclineButtons()}
            </Row>
        </ListGroup.Item>
    )
        ;
    }

    const handleClick = (e) => {
        e.stopPropagation();
        console.log(e?.target?.innerHTML);
    }

    return (
        <>
            {renderItem()}
        </>
    );
}

export default Invite;