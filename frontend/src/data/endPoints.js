export const baseUrl = "http://localhost:8080"
export function getEndPoint(keyToReturn, param1, param2) {
    if (!keyToReturn ) return null;
    const endPoints = {
        register: {
            url: `${baseUrl}/register`,
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        },
        login: {
            url: `${baseUrl}/login`,
            method: "GET",
        },
        events: {
            url: `${baseUrl}/events`,
            method: "GET",
        },
        editEvent: {
            url: `${baseUrl}/events?id=${param1}&ownerId=${param2}`,
            method: "PUT",
        },
        addEvent: {
            url: `${baseUrl}/events`,
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        },
        deleteEvent: {
            url: `${baseUrl}/events?id=${param1}&ownerId=${param2}`,
            method: "DELETE",
        },
        getMatchingUsers: {
            url: `${baseUrl}/users?query=${param1}`,
            method: "GET",
        },
        addInvitesToEvent: {
            url: `${baseUrl}/users?eventId=${param1}`,
            method: "POST",
        },
    }
    return endPoints[keyToReturn];
}
