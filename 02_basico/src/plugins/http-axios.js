const axios = require('axios');

const httpClient = {
    get: async (url) => {
        try {
        const response = await axios.get(url);
        return response.data;
        } catch (error) {
        console.error(error);
        }
    },
};

//----------------------------------------------------------------

const httpAxiosClient = {
    get: async (url) => {
        const { data } = await axios.get(url);
        return data;
    },
};


module.exports = {
    httpAxios: httpClient,
};