const axios = require("axios");

const uri = process.env.AXIOS_URI || "https://fakestoreapi.com/products";

async function getAll() {
    return axios.get(uri);
}

async function getByID(id) {
    return axios.get(uri + "/" + id);
}

async function getByQuery1(query) {
    const queryKey = Object.keys(query)[0];
    const queryValue = query[queryKey];

    const dataObj = await getAll();
    const dataArr = Object.entries(dataObj.data).map((entry) => entry[1]);

    console.log("QUERY=", queryKey + ":", queryValue);
    const result = dataArr.filter((entry) => entry[queryKey] == queryValue);

    return result;
}

async function getByQueries(queries) {
    const queryKeys = Object.keys(queries);
    const queryValues = Object.values(queries);

    const dataObj = await getAll();
    const dataArr = Object.entries(dataObj.data).map((entry) => entry[1]);

    let result = dataArr;
    for (let i = 0; i < queryKeys.length; i++) {
        console.log(`QUERY(${i})=`, queryKeys[i] + ":", queryValues[i]);
        result = result.filter((entry) => entry[queryKeys[i]] == queryValues[i]);
    }

    return result;
}

function useAxiosAPI() {
    return {
        getAll,
        getByID,
        getByQuery1,
        getByQueries,
    };
}

module.exports = useAxiosAPI;