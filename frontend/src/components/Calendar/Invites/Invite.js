import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";

const handleClick = (e) => {
    console.log(e?.target?.innerHTML);
}

function Invite({invite}) {
    return (
        <ListGroup.Item action onClick={(e) => handleClick(e)} variant={"info"}>
            {invite.eventTitle}
        </ListGroup.Item>
    );
}

export default Invite;