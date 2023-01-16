const jwt = require("jsonwebtoken");

const { login } = require("../../models/auth.model/login.model");
const {
  regexMail,
  regexPassword,
  credentialsError,
  regexGeneric,
  serverIssue,
} = require("../../utils/data");

const accessTimeLife = "2h";
const refreshTimeLife = "10h";

async function httpLogin(req, res) {
  const { username, password } = req.body;
  if (
    !username ||
    !regexMail.test(username) ||
    !password ||
    !regexGeneric.test(password)
  ) {
    return res.status(400).json({ response: credentialsError });
  }
  try {
    let user = await login(username, password);
    if (!user) {
      return res.status(400).json({ response: credentialsError });
    }
    return res.status(200).json({
      username: user.username,
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      roles: user.roles,
      createdAt: user.createdAt,
      accessTolen: _getToken(user, accessTimeLife),
      refreshToken: _getToken(user, refreshTimeLife),
    });
  } catch (error) {
    return res.status(500).json({ error: serverIssue });
  }
}

//  génère un token d'accès ou de refresh
const _getToken = (user, timeLife) => {
  return jwt.sign(
    {
      id: user.id,
      roles: user.roles,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: timeLife }
  );
};

module.exports = { httpLogin };
