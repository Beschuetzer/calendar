import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import homeReducer from './modules/home'
import registerReducer from './modules/register';
import calendarReducer from './modules/calendar';

//don't forget to add to the combined/rootReducer as a key and value

//don't forget to add to the combined/rootReducer as a key and value

//this is a function that conforms to the Redux middleware API, allowing us to create side effects
//by creating action creators that return functions which accept two args (dispatch, getState) and then can be used therein
//https://redux.js.org/api/applymiddleware
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}

const combinedReducers = combineReducers({
    login: homeReducer,
    register: registerReducer,
    calendar: calendarReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//install middle, e.g. (thunk),import, then add import to 
//applyMiddleware call as an arg to applyMiddleware(someMiddleware, someOtherMiddleware, ...)
export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(asyncMiddleware)),
);