const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const User = require("../models/user.model")
const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

router.post("/register", (req, res) => {
    console.log("REGISTER: ", req.body);
    const { username, password, email } = req.body;

    if (username === "" || password === "" || email === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter." });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({ username, email, password: hashedPassword });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        })
        .then((createdUser) => {
            const { username, email, _id } = createdUser;

            const user = { username, email, _id };

            res.status(201).json({ user: user });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        });
});

router.post("/login", (req, res) => {
    console.log("LOGIN: ", req.body);
    const { username, password } = req.body;

    if (username === "" || password === "") {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User.findOne({ username })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (!passwordCorrect) {
                res.status(401).json({ message: "Unable to authenticate the user" });
                return;
            }

            const { _id, username } = foundUser;

            const payload = { _id, username };

            const authToken = jwt.sign(
                payload,
                tokenSecret,
                { algorithm: "HS256", expiresIn: "6h" }
            );

            res.status(200).json({ authToken: authToken });

        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res) => {
    console.log("req.payload", req.payload);
    res.status(200).json(req.payload);
});

module.exports = router;
