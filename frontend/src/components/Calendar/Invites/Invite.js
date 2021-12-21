import React, {useState, useEffect} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Invite({invite}) {
    const [isAttending, setIsAttending] = useState(invite.isAttending);
    const [shouldShowButtons, setShouldShowButtons] = useState(invite.isAttending === null);

    const renderAcceptAndDeclineButtons = () => {
        if (!invite) return null;
        if (shouldShowButtons) return (
            <Row>
                <Col>
                    <Button variant={"success"} onClick={(e) => setIsAttending(true)}>Accept</Button>
                </Col>
                <Col>
                    <Button variant={"danger"} onClick={(e) => setIsAttending(false)}>Decline</Button>
                </Col>
            </Row>
        )
    }

    const toggleShowButtons = (e, shouldShow) => {
        e.stopPropagation();
        setShouldShowButtons(shouldShow);
    }

    const hideButtons = (e) => {
        toggleShowButtons(e,  false);
    }

    const showButtons = (e) => {
        toggleShowButtons(e,  true);
    }

    const renderItem = () => {
        return (<ListGroup.Item action onClick={(e) => handleClick(e)} variant={isAttending ? "success" : "danger"} as={"li"} style={{cursor: "pointer"}}>
            <Row>
                <Col>
                    <h5>{invite.eventTitle}</h5>
                </Col>
                <Col xs={"auto"} onClick={(e) => shouldShowButtons ? hideButtons(e) : showButtons(e)}>
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

    useEffect(() => {

    }, [isAttending]);


    return (
        <>
            {renderItem()}
        </>
    );
}

export default Invite;