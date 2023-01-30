const bcrypt = require("bcrypt");

const { Conseiller } = require("../../services/sequelize");

async function login(username, password) {
  const user = await Conseiller.findOne({
    where: { username: username },
  });
  if (!user) {
    return false;
  }
  console.log(username, password);
  if (!bcrypt.compare(password, user.password)) {
    return false;
  }
  return {
    username: user.username,
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    roles: user.roles,
    createdAt: user.createdAt,
  };
}

module.exports = { login };
