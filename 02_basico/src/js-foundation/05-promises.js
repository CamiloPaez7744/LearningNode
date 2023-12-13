//promises are a way to handle asynchronous operations
const { httpCliente } = require('../plugins');

const getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    return fetch(url, options)
        .then((response) => {
        if (response.ok) {
            return response.json();
        }
    
        throw new Error('Error getting the pokemon');
        })
        .then((data) => {
        return data;
        })
        .catch((error) => {
        console.error(error);
        });
};

// ----------------------------------------------------------

const getPokemonById = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// ----------------------------------------------------------

const getPokemonByIdWithHttpClient = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const pokemon = await httpCliente.get(url);
    return pokemon;
};

module.exports = getPokemon;