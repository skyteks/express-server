const express = require("express");
const logger = require("morgan");
const favicon = require("serve-favicon");
const handleBefore = require("./middleware/beforeAndAfter");
require("dotenv").config();
const apiRoutes = require("./routes/api.routes");

const app = express();
const port = process.env.PORT || 5005;

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(handleBefore);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

app.get("/hello", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
    res.status(404).send("<h1>404 Not Found<h1>");
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));