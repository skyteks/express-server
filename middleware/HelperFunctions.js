function getStatusMeaning(statusCode) {
    switch (statusCode) {
        case 200:
            return ["OK", "The request has succeeded."];
        case 201:
            return ["Created", "The request has succeeded and a new resource has been created."];
        case 204:
            return ["No Content", "The server successfully processed the request, but is not returning any content."];
        case 400:
            return ["Bad Request", "The server could not understand the request due to invalid syntax."];
        case 401:
            return ["Unauthorized", "The client must authenticate itself to get the requested response."];
        case 403:
            return ["Forbidden", "The client does not have access rights to the content."];
        case 404:
            return ["Not Found", "The server can not find the requested resource."];
        case 500:
            return ["Internal Server Error", "The server has encountered a situation it doesn't know how to handle."];
        case 502:
            return ["Bad Gateway", "The server, while acting as a gateway or proxy, received an invalid response from the upstream server."];
        case 503:
            return ["Service Unavailable", "The server is not ready to handle the request."];
        case 504:
            return ["Gateway Timeout", "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."];
        default:
            return ["Unknown Status Code", "The status code is not recognized."];
    }
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
}

export {
    //getStatusMeaning,
    formatTime,
};