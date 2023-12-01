const users = [
  {
    id: 1,
    name: "Wonder Woman",
  },
  {
    id: 2,
    name: "Superman",
  },
  {
    id: 3,
    name: "Batman",
  },
  {
    id: 4,
    name: "Flash",
  },
];

function getUserById(id, callback) {
  const user = users.find((user) => user.id === id);

  if (user) {
    callback(null, user);
  } else {
    callback(`User with id ${id} not found`);
  }
}

module.exports = {
  getUserById,
};
