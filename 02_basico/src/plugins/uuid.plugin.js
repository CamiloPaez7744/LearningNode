const { v4: getUuid } = require("uuid");

const Uuid = () => getUuid();

module.exports = {
  Uuid,
};
