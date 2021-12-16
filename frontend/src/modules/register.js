import {mockRegister} from '../mock/mock';
import { setCurrentUser} from '../modules/home'
import { setShouldShowWelcome } from '../modules/calendar'

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
        mockRegister(userObj, dispatch)
            .then(response => {
                console.log(response)
                dispatch(setRegistrationResult(response))

                if (response.username) {
                    dispatch(setCurrentUser(response.username));
                    dispatch(setShouldShowWelcome(true));
                    navigate('/calendar');
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setRegistrationResult(error))
            })
    }
}

