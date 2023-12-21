
// const templateExports = require('./js-foundation/01-template');
// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
require('./js-foundation/03-callbacks');
require('./js-foundation/04-factory');
const { getUserById } = require('./js-foundation/03-callbacks');
const getPokemon = require('./js-foundation/05-promises');
const { buildLogger } = require('./plugins');


const logger = buildLogger('app');

logger.info('Starting app');
logger.error('ups! an error');

const id = 2;

getUserById(id, (err, user) => {
  if (err) {
    return console.error(err);
  }

  console.log(`User: ${user.name}`);
});

// console.log(templateExports);
// console.log(emailTemplate);

getPokemon(2)
  .then((pokemon) => {
    console.log(pokemon.name);
  })
  .catch((error) => {
    console.error(error);
  });