export const baseUrl = "http://localhost:9099"
export const loginEndpoint = {
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
        headers: {
            "content-type": "application/json",
        }
    }
}