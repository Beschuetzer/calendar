//mocking login and register
import {registeredUsers, addRegisteredUser} from "../data/dataStructures";
import {addUser} from '../modules/register';

const INVALID_USERNAME_ERROR = "Please enter a valid username.";
const INVALID_PASSWORD_ERROR = "Please enter a valid password.";
const MAX_DELAY = 2250;

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

