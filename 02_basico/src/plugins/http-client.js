const httpClient = {
    get: async(url) => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        };
        
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = {
    httpClient,
};