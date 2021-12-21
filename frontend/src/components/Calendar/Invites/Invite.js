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

    const renderItem = () => {
        if (shouldShowButtons) return (
            <ListGroup.Item action onClick={(e) => handleClick(e)} variant={"info"}>
                <Row>
                    <Col>
                        <h5>{invite.eventTitle}</h5>
                    </Col>
                    {renderAcceptAndDeclineButtons()}
                </Row>
            </ListGroup.Item>
        );

        return (
            <ListGroup.Item action onClick={(e) => handleClick(e)} variant={"info"}>
                <Row>
                    <Col>
                        <h5>{invite.eventTitle}</h5>
                    </Col>
                    <Col xs={"auto"} onClick={(e) => setShouldShowButtons(true)}>&plus;</Col>
                </Row>
            </ListGroup.Item>
        )
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