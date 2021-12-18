import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import EventModal from './EventModal'
import {editEvent, setEventToInviteTo, deleteEvent} from '../../../modules/calendar'

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Event({
                   event,
                   variant,
                   index
               }) {

    const dispatch = useDispatch();
    const [shouldShowDescription, setShouldShowDescription] = useState(false);

    const getButtonMessage = () => {
        if (shouldShowDescription) return "Less";
        return "More";
    }

    const handleDetailClick = (e) => {
        e.stopPropagation();
        setShouldShowDescription(!shouldShowDescription);
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        dispatch(deleteEvent(event.id));
    }

    const handleEditClick = (e) => {
        e.stopPropagation();
        dispatch(editEvent(event))
    }

    const handleInviteClick = (e) => {
        e.stopPropagation();
        dispatch(setEventToInviteTo(event))
    }

    return (
        <>
            <Card className={`${shouldShowDescription ? 'open' : ''} user-select-none`}
                  style={{width: '18rem'}} border={"dark"}>
                <Card.Body>
                    <Row className={"align-items-center"}>
                        <Col>
                            <Card.Title className={"mb-0"}>{event.title}</Card.Title>
                        </Col>
                        <Col xs={"auto"}>
                            <CloseButton onClick={handleDeleteClick}/>
                        </Col>
                    </Row>
                    <Card.Text className={`mt-3 mb-0 ${shouldShowDescription ? "" : "d-none"}`}>
                        {event.description}
                    </Card.Text>
                    <Card.Text className={"mt-3"}><span
                        className={"fw-bold"}>Due:&nbsp;</span>{new Date(event.dateTime).toLocaleString()}
                    </Card.Text>
                    <Row className={"justify-content-between"}>
                        <Col xs={4} md={"auto"}>
                            <Button className="w-100" variant="primary"
                                    onClick={handleDetailClick}>{getButtonMessage()}</Button>
                        </Col>
                        <Col xs={4} md={"auto"}>
                            <Button className="w-100" variant="warning" onClick={handleEditClick}>Edit</Button>
                        </Col>
                        <Col xs={4} md={"auto"}>
                            <Button className="w-100" variant="danger" onClick={handleInviteClick}>Invite</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
        ;
}

export default Event;