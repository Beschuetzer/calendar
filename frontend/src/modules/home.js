import {setShouldShowWelcome} from '../modules/calendar';

//region Action Types
const SET_SHOULD_RESET_TOAST_TIMEOUT = "react_redux/home/SET_SHOULD_RESET_TOAST_TIMEOUT";
const SET_SHOULD_SHOW_TOAST = "react_redux/home/SET_SHOULD_SHOW_TOAST";
const SET_TOAST_HEADER = "react_redux/home/SET_TOAST_HEADER";
const SET_TOAST_BACKGROUND = "react_redux/home/SET_TOAST_BACKGROUND";
const SET_TOAST_TEXT = "react_redux/home/SET_TOAST_TEXT";
const SET_TOAST_TIME = "react_redux/home/SET_TOAST_TIME";
const SET_TOAST_MESSAGE = "react_redux/home/SET_TOAST_MESSAGE";
const SET_SHOULD_DISABLE_SUBMIT_BUTTON = "react_redux/home/SET_SHOULD_DISABLE_SUBMIT_BUTTON";
const SET_CURRENT_USER = "react_redux/home/SET_CURRENT_USER";
const SET_CURRENT_USER_ID = "react_redux/home/SET_CURRENT_USER_ID";
const RESET_STATE = "react_redux/home/RESET_STATE";
//endregion

const INITIAL_STATE = {
    toastHeader: "An Error Occurred!",
    toastMessage: "",
    shouldShowToast: false,
    toastBackgroundColor: "danger",
    toastTextColor: "light",
    time: "Just Now",
    shouldResetToastTimeout: false,
    shouldDisableSubmitButton: false,
    currentUser: "",
    currentUserId: -1,
}

//region Reducer
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SHOULD_RESET_TOAST_TIMEOUT:
            return {
                ...state,
                shouldResetToastTimeout: action.payload,
            }
        case SET_SHOULD_SHOW_TOAST:
            return {
                ...state,
                shouldShowToast: action.payload,
            }
        case SET_TOAST_HEADER:
            return {
                ...state,
                toastHeader: action.payload,
            }
        case SET_TOAST_MESSAGE:
            return {
                ...state,
                toastMessage: action.payload,
            }
        case SET_TOAST_BACKGROUND:
            return {
                ...state,
                toastBackgroundColor: action.payload,
            }
        case SET_TOAST_TEXT:
            return {
                ...state,
                toastTextColor: action.payload,
            }
        case SET_TOAST_TIME:
            return {
                ...state,
                time: action.payload,
            }
        case SET_SHOULD_DISABLE_SUBMIT_BUTTON:
            return {
                ...state,
                shouldDisableSubmitButton: action.payload,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case SET_CURRENT_USER_ID:
            return {
                ...state,
                currentUserId: action.payload,
            }
        case RESET_STATE:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
    //endregion
}
//endregion

//region Action Creators
export const setShouldResetToastTimeout = (value) => {
    return {
        type: SET_SHOULD_RESET_TOAST_TIMEOUT,
        payload: value,
    }
}
export const setShouldShowToast = (value) => {
    return {
        type: SET_SHOULD_SHOW_TOAST,
        payload: value,
    }
}
export const setToastHeader = (value) => {
    return {
        type: SET_TOAST_HEADER,
        payload: value,
    }
}
export const setToastBackground = (value) => {
    return {
        type: SET_TOAST_BACKGROUND,
        payload: value,
    }
}
export const setToastText = (value) => {
    return {
        type: SET_TOAST_TEXT,
        payload: value,
    }
}
export const setToastTime = (value) => {
    return {
        type: SET_TOAST_TIME,
        payload: value,
    }
}
export const setToastMessage = (value) => {
    return {
        type: SET_TOAST_MESSAGE,
        payload: value,
    }
}
export const setShouldDisableSubmitButton = (value) => {
    return {
        type: SET_SHOULD_DISABLE_SUBMIT_BUTTON,
        payload: value,
    }
}
export const setCurrentUser = (username) => {
    return {
        type: SET_CURRENT_USER,
        payload: username,
    }
}
export const setCurrentUserId = (id) => {
    return {
        type: SET_CURRENT_USER_ID,
        payload: id,
    }
}
export const resetState = () => {
    return {
        type: RESET_STATE,
    }
}
//endregion

//region Side Effects
export function handleLoginSuccess(userObj) {
    return (dispatch, getState) => {
        dispatch(setToastHeader(""));
        dispatch(setToastMessage(""));
        dispatch(setShouldShowToast(false));
        dispatch(setShouldDisableSubmitButton(false));
        dispatch(setCurrentUser(userObj?.username))
        dispatch(setCurrentUserId(userObj?.id))
        dispatch(setShouldShowWelcome(true));
    }
}

export function handleLoginFailure(exceptionMsg) {
    return (dispatch, getState) => {
        dispatch(setToastHeader("Error Occurred"));
        dispatch(setToastBackground("warning"));
        dispatch(setToastText("light"));
        dispatch(setToastMessage(exceptionMsg));
        dispatch(setShouldShowToast(true));
        dispatch(setShouldDisableSubmitButton(false));
        dispatch(setShouldShowWelcome(false));
    }
}

export function logout() {
    return (dispatch, getState) => {
        dispatch(resetState());
    }
}

//endregion

export default reducer;