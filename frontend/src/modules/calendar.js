import {v4} from 'uuid';
import {baseUrl, endPoints, getEndPoint} from "../data/endPoints";
import {
    setShouldResetToastTimeout,
    setShouldShowToast,
    setToastBackground,
    setToastHeader,
    setToastMessage,
    setToastText
} from "./home";
import {invites} from "../data/dataStructures";

const SET_SHOULD_SHOW_WELCOME = "react_redux/calendar/SET_SHOULD_SHOW_WELCOME"
const ADD_EVENT = "react_redux/calendar/ADD_EVENT"
const REMOVE_EVENT = "react_redux/calendar/REMOVE_EVENT"
const SET_EVENTS = "react_redux/calendar/SET_EVENTS"
const SET_INVITES = "react_redux/calendar/SET_INVITES"
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
        case SET_INVITES:
            return {
                ...state,
                invites: action.payload
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

export function setInvites(invites) {
    return {
        type: SET_INVITES,
        payload: invites,
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
            owner: state.login.currentUserId,
            description,
            title,
            dateTime: date,
        }

        console.table({newEventObj})
        
        const addEventEndPoint = getEndPoint("addEvent");
        fetch(addEventEndPoint.url, {
            method: addEventEndPoint.method,
            headers: addEventEndPoint.headers,
            body: JSON.stringify(newEventObj)
        })
            .then(response => response.json())
            .then(savedEvent => {
                console.table({savedEvent})
                dispatch(addEvent(savedEvent));
            })
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
        console.table({newEventObj, state})
        dispatch(setHasLoadedEventToEdit(false))
        dispatch(setShouldShowEventModal(false));

        //iterate throught each event in state and add unchanged ones
        // const eventsCopy = [];
        // for (let i = 0; i < state.calendar.events.length; i++) {
        //     const eventToCheck = state.calendar.events[i];
        //     if (eventToCheck.id == newEventObj.id) {
        //         eventsCopy.push(newEventObj);
        //         continue;
        //     }
        //     eventsCopy.push(eventToCheck);
        // }
        // console.table({eventsCopy})

        let indexToUse = -1;
        const eventsCopy = [...state.calendar.events];
        for (let i = 0; i < eventsCopy.length; i++) {
            const eventToCheck = eventsCopy[i];
            if (eventToCheck.id === newEventObj.id) {
                indexToUse = i;
                break;
            }
        }
        eventsCopy[indexToUse] = newEventObj;
        dispatch(setEvents(eventsCopy))
        putEvent(newEventObj);
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
            console.table({startDate, endDate, eventDate: event.dateTime})
            if (!startDate || !endDate) return true;
            if (event.dateTime >= startDate && event.dateTime <= endDate) return true;
            return false;
        })

        console.table({filteredEvents})
        dispatch(setFilteredEvents(filteredEvents.length > 0 ? filteredEvents : null))
    }
}

export function closeInviteModal() {
    return (dispatch, getState) => {
        dispatch(setEventToInviteTo(null));
        dispatch(resetUsersToInvite())
    }
}

// export function fetchUserEvents(username) {
//     return (dispatch, getState) => {
//         if (!username) return;
//         const eventsEndpoint = getEndPoint("events");
//
//         fetch(`${eventsEndpoint.url}?username=${username}`, {
//             method: eventsEndpoint.method
//         })
//             .then(response => response.json())
//             .then(events => {
//                 console.table({json: events})
//                 dispatch(setEvents(events));
//             })
//             .catch(err => console.log(err))
//     }
// }

// export function fetchInvites(username) {
//     return (dispatch, getState) => {
//         const getInvitesEndpoint = getEndPoint("getInvites", username);
//         fetch(getInvitesEndpoint.url, {
//             method: getInvitesEndpoint.method
//         })
//             .then(respsone => respsone.json())
//             .then(invites => {
//                 console.table({invites})
//             })
//             .catch(err => {
//                 dispatch(setToastBackground("warning"));
//                 dispatch(setToastHeader("Error Occured!"))
//                 dispatch(setToastMessage("Error fetching invites"));
//                 dispatch(setShouldShowToast(true));
//             })
//     }
// }

export function deleteEvent(id) {
    return (dispatch, getState) => {
        if (id <= 0) return;

        const state = getState();

        const deleteEventEndpoint = getEndPoint("deleteEvent", id, state.login.currentUserId);
        fetch(deleteEventEndpoint.url, {
            method: deleteEventEndpoint.method,
        })
            .then(response => response.json())
            .then(successMessage => {
                console.table({successMessage})
                dispatch(setShouldShowToast(true));
                dispatch(setToastText(successMessage));
            })
            .catch(error => {
                dispatch(setShouldShowToast(true));
                dispatch(setToastText(error));
            })

        dispatch(removeEvent(id));
    }
}

//endregion

//region Helpers
function putEvent(eventToModify) {
    const editEventsEndpoint = getEndPoint("editEvent", eventToModify.id,  eventToModify.owner);
    console.table({editEventsEndpoint, eventToModify})
    fetch(editEventsEndpoint.url, {
        method: editEventsEndpoint.method,
        body: JSON.stringify(eventToModify),
        headers: {
            "content-type": "application/json",
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
        .catch(e => console.log(e))
}

export function createInvites() {
    return (dispatch, getState) => {
        const state = getState();
        const eventToInviteTo = state.calendar.eventToInviteTo;
        const usersToInvite = state.calendar.usersToInvite;

        console.table({eventToInviteTo, usersToInvite})
        const addInvitesEndpoint = getEndPoint("addInvites", eventToInviteTo.id);
        // url: `${baseUrl}/users?eventId=${param1}`,
        fetch(addInvitesEndpoint.url, {
            method: addInvitesEndpoint.method,
            headers: addInvitesEndpoint.headers,
            body: JSON.stringify(usersToInvite),
        })
            .then(response => {
                if (response.ok) {
                    dispatch(resetUsersToInvite());
                    dispatch(setEventToInviteTo(null))
                    dispatch(setToastBackground("success"));
                    dispatch(setToastHeader("Success!"));
                    dispatch(setShouldResetToastTimeout(true));
                    dispatch(setToastMessage(`${usersToInvite.join(', ')} invited to '${eventToInviteTo.title}'`))
                    dispatch(setShouldShowToast(true));
                }
            })
            .catch(err => {
                dispatch(setToastBackground("warning"));
                dispatch(setToastMessage(err))
                dispatch(setShouldShowToast(true))
            })
    }
}
//endregion


