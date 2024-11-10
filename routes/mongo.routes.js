const router = require("express").Router();
const path = require("path");
const mongoAPI = require(path.resolve("./middleware/mongooseAPI"));

router.get("/", async (req, res) => {
    const { getAll } = mongoAPI();
    try {
        const apiRes = await getAll();
        res.status(200).send(apiRes);
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