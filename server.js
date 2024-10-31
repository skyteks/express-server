const express = require("express");
const logger = require("morgan");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const data = require(__dirname + "/data/data.json");
const { useAxiosAPI } = require("./services/axiosAPI");

app.use(logger('dev'));
app.use(express.static("public"));
app.use(express.json());
app.use(myMiddleware);

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/view/index.html");
});

app.get("/hello", (request, response) => {
    response.send("<h1>Hello World</h1>");
});

app.get('/data', (req, res) => {
    res.json(data);
});

app.get("/data/:entryId", (request, response) => {
    const { entryId } = request.params;
    console.log(entryId);
    const dataEntry = data.find((entry) => entry.id === parseInt(entryId));
    console.log(dataEntry);
    response.json(dataEntry);
});

app.get("/search", (req, res) => {

    console.log(req.query);

    res.json(req.query);

});

app.get('/fake-api', async (req, res) => {
    const { axiosGetAllFake } = useAxiosAPI();
    try {
        const response = await axiosGetAllFake();
        res.status(response.status).json(parseResult(response));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/fake-api/:id', async (req, res) => {
    const { axiosGetByIDFake } = useAxiosAPI();
    const { id } = req.params;
    try {
        const response = await axiosGetByIDFake(id);
        res.status(response.status).json(parseResult(response));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/api', async (req, res) => {
    const { axiosGetAll } = useAxiosAPI();
    try {
        const response = await axiosGetAll();
        res.status(response.status).json(parseResult(response));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get("*", (request, response) => {
    response.status(404).send("404 Not Found");
});

app.listen(port, () => console.log("Express Server running on: http://localhost:" + port));

function myMiddleware(request, response, next) {
    if (request.originalUrl == "/favicon.ico") {
        return;
    }
    next();
}

function parseResult(response) {
    // return { status: response.status, text: response.statusText, headers: response.headers, config: response.config, data: response.data };
    return { method: response.config.method, status: response.status, url: response.config.url, data: response.data };
}