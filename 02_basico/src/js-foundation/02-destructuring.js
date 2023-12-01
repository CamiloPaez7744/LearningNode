
// console.log( process.env );

const { SHELL } = process.env;


// console.table( { SHELL } );

const characters = ['Flash', 'Superman', 'Batman', 'Green Lantern'];

const [ , , batman ] = characters;

console.log( batman );