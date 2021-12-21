import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import {useDispatch, useSelector} from "react-redux";
import Invite from "./Invite";

function InvitesManager(props) {
    {/*
            Set the active prop to indicate the list groups current active selection.

            Set the disabled prop to prevent actions on a <ListGroup.Item>. For elements that aren't naturally disable-able (like anchors) onClick handlers are added that call preventDefault to mimick disabled behavior.

            Toggle the action prop to create actionable list group items, with disabled, hover and active styles. List item actions will render a <button> or <a> (depending on the presence of an href) by default but can be overridden by setting the as prop as usual.
            List items actions are distinct from plain items to ensure that click or tap affordances aren't applied to non-interactive items.

            Add the 'variant="flush"' to remove outer borders and rounded corners to render list group items edge-to-edge in a parent container such as a Card.
            Add the numbered prop to opt into numbered list group items. Numbers are generated via CSS (as opposed to a <ol>s default browser styling) for better placement inside list group items and to allow for better customization.

            Use the horizontal prop to make the ListGroup render horizontally. Currently horizontal list groups cannot be combined with flush list groups.
            horizontal="{sm|md|lg|xl|xxl}" makes the list group horizontal starting at that breakpoint’s min-width.

            adding 'action' prop adds additional hover and active styles

            Using color to add meaning only provides a visual indication,
            which will not be conveyed to users of assistive technologies – such as screen readers.
            Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text),
            or is included through alternative means, such as additional text hidden with the .visually-hidden class.
        */
    }

    const dispatch = useDispatch();
    const invites = useSelector((state => state.calendar.invites));

    const renderInvites = () => {
        return invites.map(invite => {
            return <Invite invite={invite}/>
        })
    }

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