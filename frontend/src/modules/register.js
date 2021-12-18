import {mockRegister} from '../mock/mock';
import { setCurrentUser} from '../modules/home'
import { setShouldShowWelcome } from '../modules/calendar'
import {endPoints, getEndPoint} from "../data/endPoints";
import {getSha256} from "../helpers/helpers";

const ADD_USER = 'react_redux/register/ADD_USER';
const SET_REGISTRATION_RESULT = 'react_redux/register/SET_REGISTRATION_RESULT';

const INITIAL_STATE = {
    registeredUsers: [],
    registrationResult: {},
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                registeredUsers: [...state.registeredUsers, action.payload]
            }
        case SET_REGISTRATION_RESULT:
            console.log(action.payload)
            return {
                ...state,
                registrationResult: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;


//#Action Creators
export const addUser = (userToAdd) => {
    return {
        type: ADD_USER,
        payload: userToAdd,
    }
}

export const setRegistrationResult = (registrationResult) => {
    return {
        type: SET_REGISTRATION_RESULT,
        payload: registrationResult,
    }
}
//#endregion

//#region Side FX
export function executeAddUser(userObj, navigate) {
    return (dispatch, getState) => {
        if (!userObj || !userObj.username || !userObj.password) return;
        console.table(userObj)

        const registerEndpoint = getEndPoint("register");

        getSha256(userObj.password)
            .then(hashedPassword => {
                fetch(registerEndpoint.url, {
                    headers: registerEndpoint.headers,
                    method: registerEndpoint.method,
                    body: JSON.stringify({...userObj, hashedPassword}),
                })
                    .then(response => response.json())
                    .then(json => {
                        console.table({json})
                        dispatch(setRegistrationResult(json))

                        if (json.username) {
                            dispatch(setCurrentUser(json.username));
                            dispatch(setShouldShowWelcome(true));
                            navigate('/calendar');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(setRegistrationResult(error))
                    })
            })
            .catch(e => console.log(e));


    }
}

