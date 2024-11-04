const router = require("express").Router();
const path = require("path");
const axiosAPI = require(path.resolve("./middleware/axiosAPI"));

router.get("/", async (req, res) => {
    const { getAll } = axiosAPI();
    try {
        const apiRes = await getAll();
        res.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/search", async (req, res) => {
    const { getByQueries } = axiosAPI();
    try {
        const apiRes = await getByQueries(req.query);
        res.json(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


router.get("/:id", async (req, res) => {
    const { getByID } = axiosAPI();
    const { id } = req.params;
    try {
        const apiRes = await getByID(id);
        res.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

function parseResult(response) {
    // return { status: response.status, text: response.statusText, headers: response.headers, config: response.config, data: response.data };
    return {
        method: response.config.method.toUpperCase(),
        status: response.status,
        url: response.config.url,
        data: response.data,
    };
}

module.exports = router;