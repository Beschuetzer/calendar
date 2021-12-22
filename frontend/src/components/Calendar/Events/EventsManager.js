import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

import Event from './Event'
import EventFilter from './EventFilter'
import EventModal from './EventModal'
import InviteModal from '../Invites/InviteModal'
import {openAddEventModal} from '../../../modules/calendar'
import ItemPagination from "../../ItemPagination";

function EventsManager(props) {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.calendar.events);
    const filteredEvents = useSelector((state) => state.calendar.filteredEvents);

    const handleAddEvent = (e) => {
        e.stopPropagation();
        dispatch(openAddEventModal())
    }

    const renderEvents = () => {
        let eventsTouse = events;
        if (filteredEvents?.length > 0) eventsTouse = filteredEvents;
        if (filteredEvents === null) eventsTouse = [];

        return eventsTouse.map(event => {
            return (
                <Col key={event.id} className={"p-0"} xs={"auto"}>
                    <Event event={event} variant={"secondary"}
                    />
                </Col>

            )
        })
    }


    return (
        <Row>
            <Col className={"text-center text-md-start mb-3"}>
                <h2>Your Events:</h2>
                <Row className={"justify-content-center justify-content-md-start align-items-md-center align-items-start"}>
                    <Col xs={"auto"} className={"mb-3 mb-md-0"}>
                        <Button variant={"success"} onClick={handleAddEvent}>Add Event</Button>
                    </Col>
                    <Col xs={12} md={"auto"}>
                        <EventFilter/>
                    </Col>
                </Row>
            </Col>

            <Row className={"justify-content-md-start justify-content-center mx-0"}>
                {renderEvents()}
            </Row>
            <EventModal></EventModal>
            <InviteModal></InviteModal>
            <ItemPagination/>
        </Row>
    );
}

export default React.memo(EventsManager);