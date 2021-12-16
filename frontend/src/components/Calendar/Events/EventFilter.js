import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {getMinDate} from '../../../helpers/helpers'
import {applyEventFilter, setFilteredEvents} from '../../../modules/calendar';

function EventFilter(props) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();

    const handleApplyClick = (e) => {
        dispatch(applyEventFilter(startDate, endDate));
    }

    const handleResetClick = (e) => {
        setStartDate('')
        setEndDate('')
        dispatch(setFilteredEvents([]))
    }

    useEffect(() => {
        if (!startDate || !endDate) return;
        console.table({startDate, endDate})
        if (startDate >= endDate) setErrorMsg('Invalid Date Range');
        else setErrorMsg('');
    }, [startDate, endDate]);


    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item className={"mx-auto mx-md-0"} style={{width: '18rem'}} eventKey="0">
                <Accordion.Header>Filter by Dates</Accordion.Header>
                <Accordion.Body>
                    <Alert variant={"danger"} show={!!errorMsg}>{errorMsg}</Alert>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Start Date"
                        className="mb-3"
                    >
                        <Form.Control type="datetime-local" min={getMinDate()} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="End Date"
                        className="mb-3"
                    >
                        <Form.Control type="datetime-local" min={getMinDate()} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </FloatingLabel>
                    <Row className={"justify-content-between"}>
                        <Col className={"text-start"}>
                            <Button disabled={!!errorMsg || !startDate || !endDate} className={"w-100"} variant={"success"} onClick={handleApplyClick}>Apply</Button>
                        </Col>
                        <Col className={"text-end"}>
                            <Button disabled={!startDate && !endDate} className={"w-100"} variant={"danger"} onClick={handleResetClick}>Reset</Button>
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default EventFilter;