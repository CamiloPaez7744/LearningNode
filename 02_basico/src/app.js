
// const templateExports = require('./js-foundation/01-template');
// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
require('./js-foundation/03-callbacks');
const { getUserById } = require('./js-foundation/03-callbacks');

const id = 2;

getUserById(id, (err, user) => {
  if (err) {
    return console.error(err);
  }

  console.log(`User: ${user.name}`);
});

// console.log(templateExports);
// console.log(emailTemplate);