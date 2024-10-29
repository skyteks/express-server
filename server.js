const express = require("express");
//const morgan = require("morgan");

const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/view/index.html");
});

app.get("/hello", (request, response) => {
    response.send("<h1>Hello World</h1>");
});

const port = 3000;
app.listen(port, () => console.log("Express Server running on " + port));
