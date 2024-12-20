const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { colors, statusTypes } = require("../data/data.json");

const noteSchema = new Schema({
    title: { type: String, required: true, unique: true },
    status: { type: String, enum: statusTypes, required: true },
    color: { type: String, enum: colors, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text1: { type: String, required: true },
    text2: { type: String },
    text3: { type: String },
    text4: { type: String },
    text5: { type: String },
});

const Note = model("Note", noteSchema);

module.exports = Note;
