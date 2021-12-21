import React, {useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import {useDispatch, useSelector} from "react-redux";
import Invite from "./Invite";

function InvitesManager(props) {
    const dispatch = useDispatch();
    const invites = useSelector((state => state.calendar.invites));

    const renderInvites = () => {
        return invites.map(invite => {
            return <Invite key={invite.id} invite={invite}/>
        })
    }

    useEffect(() => {
        console.log("re-render of invitesmanager")
    });
    

    return (
        <>
            <div className={"text-center mb-3 mt-3 mt-md-0"}>
                <h2 className={"text-center mb-0"}>Your Invites</h2>
                <small>(Click for details)</small>
            </div>
            <ListGroup as="ul">
                {renderInvites()}
            </ListGroup>
        </>
    );
}

export default React.memo(InvitesManager);