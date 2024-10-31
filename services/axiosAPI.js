const axios = require("axios");

const httpsPrefix = "https://";
const urlSufix = "/products"
const baseURL = process.env.BASE_URL;

const fakeURL = httpsPrefix + "fakestoreapi.com" + urlSufix;
const url = httpsPrefix + baseURL + urlSufix;

function useAxiosAPI() {
    const axiosGetAll = () => {
        return get(url);
    };

    const axiosGetAllFake = () => {
        return get(fakeURL);
    };

    const axiosGetByID = (id) => {
        return get(url + "/" + id);
    };

    const axiosGetByIDFake = (id) => {
        return get(fakeURL + "/" + id);
    };

    function get(param) {
        return axios.get(param);
    }

    return {
        axiosGetAll,
        axiosGetAllFake,
        axiosGetByID,
        axiosGetByIDFake,
    };
}

module.exports = {
    useAxiosAPI,
};