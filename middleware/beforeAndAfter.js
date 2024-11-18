function handleBefore(request, response, next) {
    response.on("finish", () => handleAfter(request));

    /*
    console.log("REQUEST");
    console.log("Original URL: ", request.originalUrl);
    console.log("Method: ", request.method);
    console.log("Body: ", request.body);
    console.log("Params: ", request.params);
    console.log("Query: ", request.query);
    */
    console.log(request.method.toUpperCase(), request.originalUrl, request.body);

    next();
}

function handleAfter(request) {
    //console.log("AFTER", request.path);
}

module.exports = handleBefore;