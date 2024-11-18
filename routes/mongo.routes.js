const router = require("express").Router();
const { log } = require("console");
const path = require("path");
const mongooseAPI = require(path.resolve("./middleware/mongooseAPI"));

router.get("/", async (request, response) => {
    const { getAllNotes } = mongooseAPI();
    try {
        const apiRes = await getAllNotes();
        response.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

router.get("/search", async (request, response) => {
    const { findNotesByQuery1 } = mongooseAPI();
    try {
        const apiRes = await findNotesByQuery1(request.query);
        response.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

router.get("/:id", async (request, response) => {
    const { getNoteById } = mongooseAPI();
    const { id } = request.params;
    try {
        const apiRes = await getNoteById(id);
        response.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

router.post("/", async (request, response) => {
    const { createNote } = mongooseAPI();
    const dataObj = request.body.data;
    try {
        const apiRes = await createNote(dataObj);
        response.status(201).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

router.patch("/:id", async (request, response) => {
    const { updateNoteById } = mongooseAPI();
    const { id } = request.params;
    const dataObj = request.body.data;
    try {
        const apiRes = await updateNoteById(id, dataObj);
        response.status(204).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

router.delete("/:id", async (request, response) => {
    const { deleteNoteById } = mongooseAPI();
    const { id } = request.params;
    try {
        const apiRes = await deleteNoteById(id);
        response.status(204).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

module.exports = router;