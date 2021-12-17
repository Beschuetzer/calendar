export const baseUrl = "http://localhost:9099"
export const loginEndpoint = {
    url: `${baseUrl}/login`,
    method: "GET",
    headers: {
        "content-type": "application/json",
    }
}