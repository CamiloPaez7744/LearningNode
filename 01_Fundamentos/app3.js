const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf8');

const wordCount = data.split(' ').length;

const wordCountReact = data.match(/React/ig).length;

console.log(`There are ${wordCount} words in the README.md file.`);
console.log(`There are ${wordCountReact} instances of the word 'React' in the README.md file.`);