const axios = require("axios");

const httpsPrefix = "https://";
const baseURL = process.env.BASE_URL;

const url = httpsPrefix + "fakestoreapi.com/products";
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
    
    const dataObj = await getAll();
    const dataArr = Object.entries(dataObj.data).map((entry) => entry[1]);
    
    console.log("QUERY=", queryKey + ":", queryValue);
    const result = dataArr.filter((entry, i) => entry[queryKey] == queryValue);

    return result;
}

async function getByQuery(query) {
    const queryKeys = Object.keys(query);
    const queryValues = Object.values(query);

    const dataObj = await getAll();
    const dataArr = Object.entries(dataObj.data).map((entry) => entry[1]);

    let result = dataArr;
    for (let i = 0; i < queryKeys.length; i++) {
        console.log("QUERY=", queryKeys[i] + ":", queryValues[i]);
        result = dataArr.filter((entry, i) => entry[queryKeys[i]] == queryValues[i]);
    }

    return result;
}

function axiosAPI() {
    return {
        getAll,
        getByID,
        getByQuery1,
        getByQuery,
    };
}

module.exports = axiosAPI;