const bcrypt = require("bcrypt");

const { User } = require("../../services/sequelize");

async function login(username, password) {
  const user = await User.findOne({
    where: { username: username },
  });
  if (!user) {
    return false;
  }
  if (!bcrypt.compare(password, user.password)) {
    return false;
  }
  return user;
}

module.exports = { login };
