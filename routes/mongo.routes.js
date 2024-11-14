const router = require("express").Router();
const { log } = require("console");
const path = require("path");
const mongoAPI = require(path.resolve("./middleware/mongooseAPI"));

router.get("/", async (request, response) => {
    const { getAllNotes } = mongoAPI();
    try {
        const apiRes = await getAllNotes();
        response.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

router.get("/search", async (request, response) => {
    const { findNotesByQuery1 } = mongoAPI();
    try {
        const apiRes = await findNotesByQuery1(request.query);
        response.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

router.get("/:id", async (request, response) => {
    const { getNoteById } = mongoAPI();
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
    const { createNote } = mongoAPI();
    const dataObj = request.body;
    try {
        const apiRes = await createNote(dataObj);
        response.status(201).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

router.patch("/:id", async (request, response) => {
    const { updateNoteById } = mongoAPI();
    const { id } = request.params;
    const dataObj = request.body;
    try {
        const apiRes = await updateNoteById(id, dataObj);
        response.status(204).json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
})

router.delete("/:id", async (request, response) => {
    const { deleteNoteById } = mongoAPI();
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