const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const User = require("../models/user.model")
const { formatTime } = require("../middleware/HelperFunctions");
const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

router.post("/register", (request, response) => {
    console.log("REGISTER", request.body);
    const { username, password, email } = request.body;

    if (username === "" || password === "" || email === "") {
        response.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        response.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        response.status(400).json({ message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter." });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                console.log("REGISTER", "User already exists.");

                response.status(400).json({ message: "User already exists." });
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({ username, email, password: hashedPassword });
        })
        .catch((error) => {
            console.error("REGISTER", error);

            response.status(500).json({ message: "Internal Server Error" })
        })
        .then((createdUser) => {
            if (!createdUser) {
                return;
            }
            const { username, email, _id } = createdUser;
            const user = { username, email, _id };
            response.status(201).json({ user: user });
        })
        .catch((error) => {
            console.error("REGISTER", error);

            response.status(500).json({ message: "Internal Server Error" })
        });
});

router.post("/login", (request, response) => {
    console.log("LOGIN", request.body);
    const { email, password } = request.body;

    if (email === "" || password === "") {
        response.status(400).json({ message: "Provide email and password." });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                console.log("LOGIN", "User not found.");

                response.status(401).json({ message: "User not found." })
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (!passwordCorrect) {
                console.log("LOGIN", "Wrong username or password.");

                response.status(401).json({ message: "Wrong username or password." });
                return;
            }

            const { _id, username } = foundUser;

            const payload = { username };

            const authToken = jwt.sign(payload, tokenSecret, { algorithm: "HS256", expiresIn: "6h" });

            response.status(200).json({ authToken: authToken });

        })
        .catch((error) => {
            console.error("LOGIN", error);

            response.status(500).json({ message: "Internal Server Error" });
        });
});

router.get("/verify", isAuthenticated, (request, response) => {
    logTokenPayload(request.payload)
    response.status(200).json(request.payload);
});

function logTokenPayload(payload) {
    const issuedAt = new Date(payload.iat * 1000);
    const expiresAt = new Date(payload.exp * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingLifetime = payload.exp - currentTime;
    console.log("TOKEN", "remaining lifetime:", formatTime(remainingLifetime), "created:", issuedAt, "expires:", expiresAt);
}

module.exports = router;
