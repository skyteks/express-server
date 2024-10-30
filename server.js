const express = require("express");
const logger = require("morgan");
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const data = require(__dirname + "/data/data.json");

app.use(logger('dev'));
app.use(express.static("public"));
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

app.get("*", (request, response) => {
    response.status(404).sendFile(__dirname + "/views/not-found.html");
});

app.listen(port, () => console.log("Express Server running on " + port));

function myMiddleware(request, response, next) {
    console.log('myMiddleware was called!');
    next();
}
