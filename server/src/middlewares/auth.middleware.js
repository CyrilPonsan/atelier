const jwt = require("jsonwebtoken");
const { noAccess } = require("../utils/data");
const privateKey = process.env.PRIVATE_KEY;

/**
 * vérifie que le token contenu dans les headers est valide
 * et que l'utilisateur a le rôle "client" qui lui permet d'accéder
 * aux endpoints de l'application client
 *
 * @param {*} req headers
 * @param {*} res
 * @param {*} next
 */
const checkTokenValidity = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, privateKey);
    req.auth = { userId: decodedToken.userId, roles: decodedToken.roles };
    if (
      decodedToken.roles.includes("tech") ||
      decodedToken.roles.includes("admin")
    ) {
      next();
    } else {
      return res.status(401).json({ message: noAccess });
    }
  } catch (error) {
    res.status(401).json({ noAccess });
  }
};

module.exports = { checkTokenValidity };
