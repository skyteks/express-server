function handleBefore(req, res, next) {
    res.on("finish", () => handleAfter(req));
    //console.log("BEFORE", req.path);
    next();
}

function handleAfter(req) {
    //console.log("AFTER", req.path);
}

module.exports = handleBefore;