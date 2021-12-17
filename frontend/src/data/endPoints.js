export const baseUrl = "http://localhost:8080"
export const endPoints = {
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
    }
}