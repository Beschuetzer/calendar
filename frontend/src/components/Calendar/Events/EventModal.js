import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getDateTimeLocalString, getMinDate} from '../../../helpers/helpers'

import {saveNewEvent, closeModal, updateNewEvent} from '../../../modules/calendar'

//the modal is going change based on whether redux state 'eventToEdit is null or not' be empty
function EventModal({}) {
    const dispatch = useDispatch();
    const shouldShow = useSelector((state) => state.calendar.shouldShowEventModal);
    const eventToEdit = useSelector((state) => state.calendar.eventToEdit);

    const [shouldDisableSave, setShouldDisableSave] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState(Date.now());

    useEffect(() => {
        console.table({shouldDisableSave})
    })

    useEffect(() => {
        console.log("Changing disable save")
        if (eventToEdit) {
            setDateTime(getDateTimeLocalString(eventToEdit.dateTime));
            setDescription(eventToEdit.description);
            setTitle(eventToEdit.title);
        } else {
            resetState();
        }
        setShouldDisableSave(true);
    }, [eventToEdit]);

    const getModalTitle = () => {
        if (eventToEdit) return "Edit Event";
        return "Add Event";
    }

    const handleClose = (e) => {
        resetState();
        dispatch(closeModal());
    }

    const handleSave = (e) => {
        if (!title || !description | !dateTime) return;
        resetState();

        if (eventToEdit) {
            return dispatch(updateNewEvent({
                id: eventToEdit.id,
                owner: eventToEdit.owner,
                title,
                description,
                dateTime
            }));
        }

        return dispatch(saveNewEvent(title, description, dateTime));
    }

    const resetState = () => {
        if (!eventToEdit) {
            setDateTime('');
            setDescription('');
            setTitle('');
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setShouldDisableSave(false);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setShouldDisableSave(false);
    }

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
        setShouldDisableSave(false);
    }

    return (
        <Modal show={shouldShow} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{getModalTitle()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title:&nbsp;</Form.Label>
                        <Form.Control value={title} type="text" placeholder="Enter Event Title"
                                      onChange={(e) => handleTitleChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description:&nbsp;</Form.Label>
                        <Form.Control as={"textarea"} type="text" value={description}
                                      onChange={(e) => handleDescriptionChange(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date:&nbsp;</Form.Label>
                        <Form.Control
                            min={getMinDate()}
                            type={"datetime-local"} value={dateTime} onChange={(e) => handleDateTimeChange(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={shouldDisableSave}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(EventModal);