import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import FindUsers from './FindUsers'
import {createInvites, closeInviteModal} from '../../../modules/calendar'
import {setShouldShowToast} from "../../../modules/home";

function InviteModal(props) {
    const dispatch = useDispatch();
    const eventToInviteTo = useSelector((state) => state.calendar.eventToInviteTo)

    const handleClose = (e) => {
        dispatch(closeInviteModal());
    }

    const handleSave = (e) => {
        dispatch(createInvites());
    }

    useEffect(() => {
        dispatch(setShouldShowToast(false));
    }, [eventToInviteTo])
    
    return (
        <Modal show={!!eventToInviteTo} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Invite people to '{eventToInviteTo?.title ? eventToInviteTo?.title : ""}'</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <FindUsers></FindUsers>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(InviteModal);