const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function getAll() {
    mongoose
        .connect(uri)
        .then((x) => {
            console.log("Connected to Mongo! Database name: " + x.connections[0].name);
        });
}

function mongooseAPI() {
    return {
        getAll,
    };
}

module.exports = mongooseAPI;