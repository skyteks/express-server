const express = require("express");
const logger = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");
const handleBefore = require(path.resolve("./middleware/beforeAndAfter"));
require("dotenv").config();
const axiosRoutes = require(path.resolve("./routes/axios.routes"));
const mongoRoutes = require(path.resolve("./routes/mongo.routes"));

const app = express();
const port = process.env.PORT || 5005;

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(favicon(path.resolve("./public/favicon.ico")));
app.use(handleBefore);

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./view/index.html"));
});

app.get("/hello", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/axios", axiosRoutes);

app.use("/mongo", mongoRoutes);

app.get("*", (req, res) => {
    res.status(404).send("<h1>404 Not Found<h1>");
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));