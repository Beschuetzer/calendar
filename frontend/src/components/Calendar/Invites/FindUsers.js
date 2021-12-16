import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PersonToInvite from './PersonToInvite'
import {registeredUsers} from '../../../data/dataStructures'
import {mockGetMatchingUsernames} from '../../../mock/mock';
import {addUserToInvite, removeUserToInvite} from '../../../modules/calendar';

function FindUsers(props) {
    const dispatch = useDispatch();
    const usersToInvite = useSelector(state => state.calendar.usersToInvite)
    const [usernameToFind, setUsernameToFind] = useState('');
    const [usernamesOfFoundUsers, setUsernamesOfFoundUsers] = useState([]);
    const [foundUsers, setFoundUsers] = useState([]);

    const renderFoundUsers = (usernames) => {
        return usernames.map((username, index) => {
            if (!username) return null;
            return (
                <Col key={index}>
                    <ListGroup.Item action onClick={handleFoundUserClick}
                                    className={"match-found d-flex justify-content-between"}>
                        <span>{username}</span>
                        <span className={'ms-3 mr-0'}>&#x2b;</span>
                    </ListGroup.Item>
                </Col>
            )
        })
    }

    const renderUsersToInvite = (e) => {
        return usersToInvite.map((name, index) => {
            return (
                <PersonToInvite key={index}
                                handleDeleteUserToInvite={handleDeleteUserToInvite}
                >{name}</PersonToInvite>
            )
        })
    }

    const handleDeleteUserToInvite = (e) => {
        e.stopPropagation();
        const usernameClicked = e.target.parentElement?.textContent;
        dispatch(removeUserToInvite(usernameClicked))
    }

    const handleFoundUserClick = (e) => {
        e.stopPropagation();
        const user = e.currentTarget.textContent.replace('+', '');
        return dispatch(addUserToInvite(user));
    }

    useEffect(() => {
        const handlePromiseSuccess = (matchesFound) => {
            console.log(matchesFound)
            if (!matchesFound) return;
            setUsernamesOfFoundUsers(matchesFound);
        }

        if (!usernameToFind) return;
        mockGetMatchingUsernames(usernameToFind)
            .then(handlePromiseSuccess)
            .catch(error => console.log(error));

    }, [usernameToFind]);

    useEffect(() => {
        setFoundUsers(renderFoundUsers(usernamesOfFoundUsers))
    }, [usernamesOfFoundUsers])

    useEffect(() => {
        const newFoundUsers = usernamesOfFoundUsers.map(username => {
            for (const userToInvite of usersToInvite) {
                if (userToInvite?.trim() === username?.trim()) return null;
            }

            return username;
        })
        setFoundUsers(renderFoundUsers(newFoundUsers));
    }, [usersToInvite])


    return (
        <>
            <section>
                <h6 className={"mb-3"}>Search for a User:</h6>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="username">@</InputGroup.Text>
                    <FormControl
                        placeholder="e.g. Ali Smith"
                        aria-label="Username"
                        aria-describedby="username"
                        value={usernameToFind}
                        onChange={(e) => setUsernameToFind(e.target.value)}
                    />
                </InputGroup>
            </section>
            <hr/>
            <section>
                <h6 className={"mb-3"}>Matches Found:</h6>
                <Row>
                    {foundUsers}
                </Row>
            </section>
            <hr/>
            <section>
                <h6 className={"mb-3"}>People to Invite:</h6>
                <Row as="ul" className={"p-0"}>
                    {renderUsersToInvite()}
                </Row>
            </section>
        </>

    );
}

export default React.memo(FindUsers);