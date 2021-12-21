export const baseUrl = "http://localhost:8080"

export function getEndPoint(keyToReturn, param1, param2, param3) {
    if (!keyToReturn) return null;
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
        getInvites: {
            url: `${baseUrl}/invites?username=${param1}`,
            method: "GED",
        },
        addInvites: {
            url: `${baseUrl}/invites?eventId=${param1}`,
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        },
        changeIsAttending: {
            url: `${baseUrl}/invites?id=${param1}&inviteeId=${param2}&isAttending=${param3}`,
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }
        }
    }
    return endPoints[keyToReturn];
}
