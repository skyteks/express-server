const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

mongoose
    .connect(uri)
    .then((x) => {
        console.log("Connected to Mongo! Database name: " + x.connections[0].name);
    });

async function getAllNotes() {
    Note.find({})
        .then((notes) => {
            console.log("Retrieved notes ->", notes);

            res.status(200).json(notes);
        })
        .catch((error) => {
            console.error("Error while retrieving notes ->", error);
            res.status(500).json({ error: "Failed to retrieve notes" });
        });
}

async function findNotesByQuery1(query) {
    const queryKey = Object.keys(query)[0];
    const queryValue = query[queryKey];

    const dataObj = {};
    dataObj[queryKey] = queryValue;

    Note.find(dataObj)
        .populate("user")
        .then((notes) => {
            console.log("Retrieved notes ->", notes);

            res.status(200).json(notes);
        })
        .catch((error) => {
            console.error("Error while retrieving notes ->", error);
            res.status(500).json({ error: "Failed to retrieve notes" });
        });
}

async function createNote(params) {
    const dataObj = { ...req.body };
    Note.create()
        .then((note) => {
            console.log("Note created ->", note);
            res.status(201).json(note);
        })
        .catch((error) => {
            console.error("Error while creating the note ->", error);
            res.status(500).json({ error: "Failed to create the note" });
        });
}

async function updateNoteById(id, newStatus) {
    Note.findByIdAndUpdate(id, req.body, { status: newStatus })
        .then((note) => {
            console.log("Updated note ->", note);

            res.status(204).json(note);
        })
        .catch((error) => {
            console.error("Error while updating the note ->", error);
            res.status(500).json({ error: "Failed to update the note" });
        });
}

async function deleteNoteById(id) {
    Note.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log("Note deleted!");
            res.status(204).send();
        })
        .catch((error) => {
            console.error("Error while deleting the note ->", error);
            res.status(500).json({ error: "Deleting note failed" })
        });
}

function mongooseAPI() {
    return {
        getAllNotes,
        findNotesByQuery1,
        createNote,
        updateNoteById,
        deleteNoteById,
    };
}

module.exports = mongooseAPI;