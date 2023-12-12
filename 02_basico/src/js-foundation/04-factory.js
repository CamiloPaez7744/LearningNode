//factory function is any function which is not a class or constructor that returns a (presumably new) object. In JavaScript, any function can return an object. When it does so without the new keyword, it’s a factory function.
const { Uuid } = require('../plugins/uuid.plugin');
//const { v4: uuidv4 } = require('uuid');

const person = {name: 'Camilo', age: '25'};

const buildPerson = (name, age) => {   //factory function
    return {
        id: Uuid(),
        name,
        age,
    }
}

const camilo = buildPerson('Camilo', 25);

console.log(camilo);