const express = require("express");
const logger = require("morgan");
const favicon = require("serve-favicon");
const handleBefore = require("./middleware/beforeAndAfter");
require("dotenv").config();
const mongoRoutes = require("./routes/mongo.routes");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    credentials: true,
    origin: ["https://react-kanban-board-main.netlify.app", "http://localhost", `http://localhost:${port}`],
    exposedHeaders: ["Authorization", "username"],
};

app.use(cors(corsOptions))
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(favicon("./public/favicon.ico"));
app.use(handleBefore);

app.use("/", authRoutes);

app.use("/mongo", mongoRoutes);

app.get("/hello", (_request, response) => {
    response.send("<h1>Hello World</h1>");
});

app.get("*", (_request, response) => {
    response.status(404).json({ message: "This route does not exist." });
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));