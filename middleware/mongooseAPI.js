const mongoose = require("mongoose");
const Note = require("../models/note.model")

const uri = process.env.MONGODB_URI;

connect();
async function connect() {
    mongoose
        .connect(uri)
        .then((x) => {
            console.log("Connected to Mongo! Database name: " + x.connections[0].name);
        })
        .catch((error) => {
            console.error("Error, could not connect to MongoDB Server ->", error);
        });
}

async function getAllNotes() {
    return Note.find({})
        .then((notes) => {
            console.log("Retrieved notes ->", notes.length);

            return notes;
        })
        .catch((error) => {
            console.error("Error while retrieving notes ->", error);
            throw new Error("Failed to retrieve notes");
        });
}

async function getNoteById(id) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Note.findById(objId)
        .then((note) => {
            console.log("Retrieved note ->", note);
            return note;
        })
        .catch((error) => {
            console.error("Error while retrieving the note ->", error);
            throw new Error("Failed to retrieve the note");
        });
}

async function findNotesByQuery1(query) {
    const queryKey = Object.keys(query)[0];
    const queryValue = query[queryKey];
    const dataObj = { [queryKey]: queryValue };

    return Note.find(dataObj)
        .then((notes) => {
            console.log("Retrieved notes ->", notes.length);
            return notes;
        })
        .catch((error) => {
            console.error("Error while searching notes ->", error);
            throw new Error("Failed to search notes");
        });
}

async function createNote(dataObj) {
    return Note.create(dataObj)
        .then((note) => {
            console.log("Note created ->", note);
            return note;
        })
        .catch((error) => {
            console.error("Error while creating the note ->", error);
            throw new Error("Failed to create the note");
        });
}

async function updateNoteById(id, dataObj) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Note.findByIdAndUpdate(objId, dataObj)
        .then((note) => {
            console.log("Updated note ->", note);
            return note;
        })
        .catch((error) => {
            console.error("Error while updating the note ->", error);
            throw new Error("Failed to update the note");
        });
}

async function deleteNoteById(id) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Note.findByIdAndDelete(objId)
        .then((result) => {
            console.log("Note deleted!");
            response.status(204).send();
        })
        .catch((error) => {
            console.error("Error while deleting the note ->", error);
            throw new Error("Deleting note failed");
        });
}

function mongooseAPI() {
    return {
        getAllNotes,
        getNoteById,
        findNotesByQuery1,
        createNote,
        updateNoteById,
        deleteNoteById,
    };
}

module.exports = mongooseAPI;