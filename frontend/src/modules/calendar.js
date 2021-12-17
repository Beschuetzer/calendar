import {v4} from 'uuid';
import {endPoints} from "../data/endPoints";

const SET_SHOULD_SHOW_WELCOME = "react_redux/calendar/SET_SHOULD_SHOW_WELCOME"
const ADD_EVENT = "react_redux/calendar/ADD_EVENT"
const REMOVE_EVENT = "react_redux/calendar/REMOVE_EVENT"
const SET_EVENTS = "react_redux/calendar/SET_EVENTS"
const SET_FILTERED_EVENTS = "react_redux/calendar/SET_FILTERED_EVENTS"
const SET_EVENT_TO_EDIT = "react_redux/calendar/SET_EVENT_TO_EDIT"
const SET_SHOULD_SHOW_EVENT_MODAL = "react_redux/calendar/SET_SHOULD_SHOW_EVENT_MODAL"
const SET_EVENT_TO_INVITE_TO = "react_redux/calendar/SET_EVENT_TO_INVITE_TO"
const SET_HAS_LOADED_EVENT_TO_EDIT = "react_redux/calendar/SET_HAS_LOADED_EVENT_TO_EDIT"
const RESET_EVENT_TO_EDIT = "react_redux/calendar/RESET_EVENT_TO_EDIT"
const ADD_USER_TO_INVITE = "react_redux/calendar/ADD_USER_TO_INVITE"
const REMOVE_USER_TO_INVITE = "react_redux/calendar/REMOVE_USER_TO_INVITE"
const RESET_USERS_TO_INVITE = "react_redux/calendar/RESET_USERS_TO_INVITE"

const INITIAL_STATE = {
    shouldShowWelcome: false,
    events: [],
    filteredEvents: [],
    invites: [],
    eventToEdit: null,
    shouldShowEventModal: false,
    eventToInviteTo: null,
    hasLoadedEventToEdit: false,
    usersToInvite: [],
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SHOULD_SHOW_WELCOME:
            return {
                ...state,
                shouldShowWelcome: action.payload
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload],
            }
        case REMOVE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload)
            }
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case SET_FILTERED_EVENTS:
            console.log(action.payload)
            return {
                ...state,
                filteredEvents: action.payload
            }
        case SET_EVENT_TO_EDIT:
            return {
                ...state,
                eventToEdit: action.payload,
            }

        case SET_SHOULD_SHOW_EVENT_MODAL:
            return {
                ...state,
                shouldShowEventModal: action.payload,
            }
        case SET_EVENT_TO_INVITE_TO:
            return {
                ...state,
                eventToInviteTo: action.payload,
            }
        case SET_HAS_LOADED_EVENT_TO_EDIT:
            return {
                ...state,
                hasLoadedEventToEdit: action.payload,
            }
        case ADD_USER_TO_INVITE:
            if (!state.usersToInvite) return state

            let isPresent = false
            for (const userToInvite of state.usersToInvite) {
                if (userToInvite.trim() === action.payload.trim()) {
                    isPresent = true;
                    break;
                }
            }

            if (isPresent) return state

            return {
                ...state,
                usersToInvite: [...state.usersToInvite, action.payload],
            }
        case REMOVE_USER_TO_INVITE:
            return {
                ...state,
                usersToInvite: state.usersToInvite.filter(userToInvite => userToInvite?.trim() !== action.payload?.trim()),
            }
        case RESET_EVENT_TO_EDIT:
            return {
                ...state,
                eventToEdit: null,
            }
        case RESET_USERS_TO_INVITE:
            return {
                ...state,
                usersToInvite: [],
            }
        default:
            return state;
    }
}

export function addEvent(newEvent) {
    return {
        type: ADD_EVENT,
        payload: newEvent,
    }
}

export function removeEvent(idToRemove) {
    return {
        type: REMOVE_EVENT,
        payload: idToRemove,
    }
}

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        payload: events,
    }
}

export function setFilteredEvents(filteredEvents) {
    return {
        type: SET_FILTERED_EVENTS,
        payload: filteredEvents,
    }
}

export function setEventToEdit(eventToEdit) {
    return {
        type: SET_EVENT_TO_EDIT,
        payload: eventToEdit
    }
}

export function resetEventToEdit() {
    return {
        type: RESET_EVENT_TO_EDIT,
    }
}

export function setShouldShowWelcome(value) {
    return {
        type: SET_SHOULD_SHOW_WELCOME,
        payload: value,
    }
}

export function setShouldShowEventModal(value) {
    return {
        type: SET_SHOULD_SHOW_EVENT_MODAL,
        payload: value,
    }
}

export function addUserToInvite(userToInvite) {
    return {
        type: ADD_USER_TO_INVITE,
        payload: userToInvite,
    }
}

export function removeUserToInvite(userToInvite) {
    return {
        type: REMOVE_USER_TO_INVITE,
        payload: userToInvite,
    }
}

export function resetUsersToInvite() {
    return {
        type: RESET_USERS_TO_INVITE,
    }
}

export function setEventToInviteTo(value) {
    return {
        type: SET_EVENT_TO_INVITE_TO,
        payload: value,
    }
}

export function setHasLoadedEventToEdit(value) {
    return {
        type: SET_HAS_LOADED_EVENT_TO_EDIT,
        payload: value,
    }
}

//region Side FX
export function openAddEventModal() {
    return (dispatch, getState) => {
        dispatch(resetEventToEdit())
        dispatch(setShouldShowEventModal(true))
    }
}

export function saveNewEvent(title, description, date) {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(setShouldShowEventModal(false))

        const newEventObj = {
            id: v4(),
            owner: state.login.currentUser,
            description,
            title,
            date: date,
        }
        dispatch(addEvent(newEventObj));
    }
}

export function editEvent(editedEvent) {
    return (dispatch, getState) => {
        const state = getState();
        const eventToEdit = state.calendar.events.filter(event => event.id === editedEvent.id);
        if (eventToEdit.length === 0) return;

        dispatch(setEventToEdit(eventToEdit[0]));
        dispatch(setShouldShowEventModal(true))
    }
}

export function updateNewEvent(newEventObj) {
    return (dispatch, getState) => {
        const state = getState();
        console.log("in update new Event")
        console.table(newEventObj, state)
        dispatch(setHasLoadedEventToEdit(false))
        dispatch(setShouldShowEventModal(false));

        // //need to get the newEvents without the one that has id and add the new one
        // const newEvents = state.calendar.events.filter(event => event.id !== newEventObj.id)
        // newEvents.push(newEventObj);

        //iterate throught each event in state and add unchanged ones
        const newEvents = [];
        for (let i = 0; i < state.calendar.events; i++) {
            const eventToCheck = state.calendar.events[i];
            console.table({eventToCheck})
            if (eventToCheck.id == newEventObj.id) newEvents.push(newEventObj);
            newEvents.push(eventToCheck);
        }

        console.table({newEvents})
        dispatch(setEvents(newEvents))
    }
}

export function closeModal() {
    return (dispatch, getState) => {
        dispatch(setHasLoadedEventToEdit(false));
        dispatch(setShouldShowEventModal(false))
    }
}

export function applyEventFilter(startDate, endDate) {
    return (dispatch, getState) => {
        const state = getState();
        const filteredEvents = state.calendar.events.filter(event => {
            console.table({startDate, endDate, eventDate: event.date})
            if (!startDate || !endDate) return true;
            if (event.date >= startDate && event.date <= endDate) return true;
            return false;
        })

        console.table({filteredEvents})
        dispatch(setFilteredEvents(filteredEvents.length > 0 ? filteredEvents : null))
    }
}

export function closeInviteModal () {
    return (dispatch, getState) => {
        dispatch(setEventToInviteTo(null));
        dispatch(resetUsersToInvite())
    }
}

export function fetchUserEvents(username) {
    return (dispatch, getState) => {
        if (!username) return;
        fetch(`${endPoints.events.url}?username=${username}`, {
            method: endPoints.events.method
        })
            .then(response => response.json())
            .then(events => {
                console.table({json: events})
                dispatch(setEvents(events));
            })
            .catch(err => console.log(err))
    }
}

//endregion
