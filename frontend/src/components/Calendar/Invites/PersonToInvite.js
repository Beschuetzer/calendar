import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

function PersonToInvite({handleDeleteUserToInvite, children}) {
    return (
        <Col xs={"auto"} className={"pr-0 user-select-none"}>
            <ListGroup.Item
                className={"d-flex justify-content-between align-items-center"}
                as="li"
                variant="success"
            >
                {children}
                <CloseButton className={"ms-3"} onClick={(e) => handleDeleteUserToInvite(e)}/>
            </ListGroup.Item>
        </Col>
    );
}

export default PersonToInvite;