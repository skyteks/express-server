const router = require("express").Router();
const path = require("path");
const mongoAPI = require(path.resolve("./middleware/mongooseAPI"));

router.get("/", async (req, res) => {
    const { getAllNotes } = mongoAPI();
    try {
        const apiRes = await getAllNotes();
        res.status(200).send(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/search", async (req, res) => {
    const { findNotesByQuery1 } = mongoAPI();
    try {
        const apiRes = await findNotesByQuery1(req.query);
        res.status(200).send(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    const { createNote } = mongoAPI();
    try {
        const apiRes = await createNote();
        res.status(201).send(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

router.put("/:id", async (req, res) => {
    const { updateNoteById } = mongoAPI();
    const { id } = req.params;
    try {
        const apiRes = await updateNoteById(id);
        res.status(204).send(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

router.delete("/:id", async (req, res) => {
    const { deleteNoteById } = mongoAPI();
    const { id } = req.params;
    try {
        const apiRes = await deleteNoteById(id);
        res.status(204).send(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

module.exports = router;