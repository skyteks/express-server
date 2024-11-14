const jwt = require("jsonwebtoken");

const isAuthenticated = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("TOKEN authentication successful");
        
        request.payload = payload;

        next();
    } catch (error) {
        response.status(401).json("token not provided or not valid");
    }
}

module.exports = { isAuthenticated }
