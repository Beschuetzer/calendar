export const baseUrl = "http://localhost:8080"
export const loginEndpoint = {
    url: `${baseUrl}/login`,
    method: "GET",
    headers: {
        "content-type": "application/json",
    }
}