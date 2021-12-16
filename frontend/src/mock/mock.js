//mocking login and register
import {registeredUsers, addRegisteredUser} from "../data/dataStructures";
import {addUser} from '../modules/register';

const INVALID_USERNAME_ERROR = "Please enter a valid username.";
const INVALID_PASSWORD_ERROR = "Please enter a valid password.";
const MAX_DELAY = 2250;

export function mockLogin(username, password) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * MAX_DELAY + 250;
        setTimeout(() => {
            const errorMsg = getIsValidCredentials(username, password);
            console.log(`errorMsg = ${errorMsg}`);
            if (!errorMsg) resolve(username);
            else reject({
                error: errorMsg,
            });
        }, delay)
    })
}

export function mockRegister(userObj, dispatch) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * (MAX_DELAY - 1000) + 250;
        setTimeout(() => {
            console.log(userObj)
            if (!userObj.username || !userObj.password) reject("Some server error occured...");

            const error = getRegistrationErrorMessage(userObj);
            if (!error) {
                const hashedPassword = getHash(userObj.password);
                dispatch(addUser({
                    ...userObj,
                    password: hashedPassword,
                }))
                addRegisteredUser(userObj);
                console.table(registeredUsers)
                resolve({username: userObj.username});
            }
            else reject({error});
        }, delay)
    })
}

export function mockGetMatchingUsernames(string) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * MAX_DELAY + 150;
        setTimeout(() => {
            if (!string) reject("Invalid matching string")
            else {
                const matches = Object.keys(registeredUsers).filter(username => {
                    const regexToUse = new RegExp(`.*${string}.*`, "g")
                    if (regexToUse.exec(username)) return true
                    return false;
                })
                console.log(matches)
                resolve(matches)
            }
        }, delay)
    })
}

function getIsValidCredentials(username, password) {

    if (!username) return INVALID_USERNAME_ERROR;
    if (!password) return INVALID_PASSWORD_ERROR;

    const storedPassword = registeredUsers[username];

    if (!storedPassword) return `'${username}' may or may not be a valid username...`

    console.table({username, password, storedPassword, hashed: getHash(password)})

    return storedPassword?.password === getHash(password) ? "" : `Invalid password for username '${username}'. Please try again.`;
}

function getRegistrationErrorMessage(userObj) {

    if (!userObj.username) return INVALID_USERNAME_ERROR;
    if (!userObj.password) return INVALID_PASSWORD_ERROR;
    if (registeredUsers[userObj.username]) return `'${userObj.username}' is already taken.  Please try a different username.`;
    return '';
}

export function getHash (string) {
    if (!string || string.length === 0) return 0;
    let hash = 0, char;

    for (let i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

