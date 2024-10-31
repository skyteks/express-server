const axios = require("axios");

const httpsPrefix = "https://";
const urlSufix = "/products"
const baseURL = process.env.BASE_URL;

const url = httpsPrefix + "fakestoreapi.com" + urlSufix;
//const url = httpsPrefix + baseURL + urlSufix;

async function getAll() {
    return axios.get(url);
}

async function getByID(id) {
    return axios.get(url + "/" + id);
}

async function getByQuery1(query) {
    const queryKey = Object.keys(query)[0];
    const queryValue = query[queryKey];
    console.log("QUERY=", queryKey + ":", queryValue);

    const dataObj = await getAll();
    const dataArr = Object.entries(dataObj.data).map((entry) => entry[1]);

    console.log(JSON.stringify(dataArr));
    const result = dataArr.find((entry) => entry[queryKey] === queryValue);
    console.log(result);

    return result;
}

function useAxiosAPI() {
    return {
        getAll,
        getByID,
        getByQuery1,
    };
}

module.exports = {
    useAxiosAPI,
};