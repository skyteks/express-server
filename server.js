const express = require("express");
const logger = require("morgan");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const { useAxiosAPI } = require("./services/axiosAPI");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(handleBefore);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

app.get("/hello", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/api/search", async (req, res) => {
    next2(req, res);
    const { getByQuery1 } = useAxiosAPI();
    try {
        const apiRes = await getByQuery1(req.query);
        res.json(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get("/api", async (req, res) => {
    next2(req, res);
    const { getAll } = useAxiosAPI();
    try {
        const apiRes = await getAll();
        res.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get("/api/:id", async (req, res) => {
    next2(req, res);
    const { getByID } = useAxiosAPI();
    const { id } = req.params;
    try {
        const apiRes = await getByID(id);
        res.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));

function handleBefore(req, res, next) {
    if (req.originalUrl == "/favicon.ico") {
        return;
    }
    //console.log("BEFORE", req.path);
    next();
}

function next2(req, res) {
    res.on("finish", () => handleAfter(req));
}

function handleAfter(req) {
    //console.log("AFTER", req.path);
}

function parseResult(response) {
    // return { status: response.status, text: response.statusText, headers: response.headers, config: response.config, data: response.data };
    return { method: response.config.method.toUpperCase(), status: response.status, url: response.config.url, data: response.data };
}