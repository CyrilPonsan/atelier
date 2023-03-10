const jwt = require("jsonwebtoken");

const { login } = require("../../models/auth.model/login.model");
const {
  regexMail,
  regexPassword,
  credentialsError,
  serverIssue,
  noAccess,
} = require("../../utils/data");

const accessTimeLife = "2h";
const refreshTimeLife = "10h";

//  authentification de l'utilisateur
async function httpLogin(req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  if (
    !username ||
    !regexMail.test(username) ||
    !password ||
    !regexPassword.test(password)
  ) {
    return res.status(400).json({ response: credentialsError });
  }
  try {
    let user = await login(username, password);
    if (!user) {
      return res.status(400).json({ response: credentialsError });
    }
    return res.status(200).json({
      user,
      accessTolen: _getToken(user, accessTimeLife),
      refreshToken: _getToken(user, refreshTimeLife),
    });
  } catch (error) {
    return res.status(500).json({ error: serverIssue });
  }
}

//  retourne des tokens tout neufs
function httpGenerateNewTokens(req, res) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ noAccess });
  }
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.PRIVATE_KEY);
    if (
      !decodedToken.roles[0] === "tech" ||
      !decodedToken.roles[0] === "admin"
    ) {
      return res.status(403).json({ message: noAccess });
    }
    const user = {
      id: decodedToken.id,
      roles: decodedToken.roles,
    };
    res.status(200).json({
      accessToken: _getToken(user, accessTimeLife),
      refreshToken: _getToken(user, refreshTimeLife),
    });
  } catch (err) {
    res.status(403).json({ message: serverIssue + err });
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

module.exports = { httpLogin, httpGenerateNewTokens };
