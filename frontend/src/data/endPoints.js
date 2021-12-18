export const baseUrl = "http://localhost:8080"
export function getEndPoint(keyToReturn, eventId, ownerId) {
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
            url: `${baseUrl}/events?id=${eventId}&ownerId=${ownerId}`,
            method: "PUT",
        },
        addEvent: {
            url: `${baseUrl}/events`,
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        },
    }
    return endPoints[keyToReturn];
}
