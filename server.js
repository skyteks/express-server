const express = require("express");
const logger = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");
const handleBefore = require(path.resolve("./middleware/beforeAndAfter"));
require("dotenv").config();
const axiosRoutes = require(path.resolve("./routes/axios.routes"));
const mongoRoutes = require(path.resolve("./routes/mongo.routes"));
const { isAuthenticated } = require("./middleware/jwt.middleware");
const authRoutes = require(path.resolve("./routes/auth.routes"));
const cors = require("cors")
const app = express();
const port = process.env.PORT || 5005;

app.use(cors({credentials: true,/*origin: 'http://localhost:5173',*/}))
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(favicon(path.resolve("./public/favicon.ico")));
app.use(handleBefore);

app.use("/", authRoutes);

app.use("/axios", axiosRoutes);

app.use("/mongo", isAuthenticated, mongoRoutes);

app.get("/", (request, response) => {
    response.sendFile(path.resolve("./view/index.html"));
});

app.get("/hello", (request, response) => {
    response.send("<h1>Hello World</h1>");
});

app.get("*", (request, response) => {
    response.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));