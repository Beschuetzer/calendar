import {v4} from 'uuid';
import {getHash} from '../mock/mock'

const testEventId = v4();
const testEventId2 = v4();
const testEventId3 = v4();
const testEventId4 = v4();
const testEventId5 = v4();

export let registeredUsers = {
    test: {password: getHash("test")},
    test22121312311: {password: getHash("test")},
    test3: {password: getHash("test")},
    test4: {password: getHash("test")},
    test5: {password: getHash("test")},
    test678901111: {password: getHash("test")},
}

//event is time,
export const events = [
    getNewEvent(
        "test",
        "The event description goes here.  It might be rather long depending on the event",
        "Adam's Birthday",
        testEventId,
    ),
    getNewEvent(
        "test",
        "The event description goes here.  It might be rather long depending on the event",
        "Adam's Birthday 2",
        testEventId2,
    ),
    getNewEvent(
        "test",
        "The event description goes here.  It might be rather long depending on the event",
        "Adam's Birthday 2",
        testEventId3,
    ),
    getNewEvent(
        "test",
        "The event description goes here.  It might be rather long depending on the event",
        "Adam's Birthday 2",
        testEventId4,
    ),
    getNewEvent(
        "test",
        "The event description goes here.  It might be rather long depending on the event",
        "Adam's Birthday 2",
        testEventId5,
    ),
]

export const invites = [
    getNewInvite("test", testEventId),
];

export function getNewEvent(owner, description, title, id = v4()) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return {
        id,
        owner,
        description,
        title,
        date: now.toISOString().slice(0,16),
    }
}

export function getNewInvite(owner, eventId) {
    return {
        eventId,
        owner,
    }
}


const eventMapping = {
    //username as key and list of events as values?
    //could also just filter each time
}

const inviteMapping = {
    //username as key and list of events as values?
    //could also just filter each time
}

export function addRegisteredUser(userObj) {
    const newUserObj = {
        ...userObj,
        password: getHash(userObj.password)
    }
    return registeredUsers = {...registeredUsers, [newUserObj.username]: newUserObj};
}