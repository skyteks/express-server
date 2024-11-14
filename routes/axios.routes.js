const router = require("express").Router();
const path = require("path");
const useAxiosAPI = require(path.resolve("./middleware/axiosAPI"));

router.get("/", async (request, response) => {
    const { getAll } = useAxiosAPI();
    try {
        const apiRes = await getAll();
        response.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});

router.get("/search", async (request, response) => {
    const { getByQueries } = useAxiosAPI();
    try {
        const apiRes = await getByQueries(request.query);
        response.json(apiRes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
});


router.get("/:id", async (request, response) => {
    const { getByID } = useAxiosAPI();
    const { id } = request.params;
    try {
        const apiRes = await getByID(id);
        response.status(apiRes.status).json(parseResult(apiRes));
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
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