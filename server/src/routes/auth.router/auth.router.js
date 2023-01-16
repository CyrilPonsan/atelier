const express = require("express");

const { httpLogin } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/", httpLogin);

module.exports = authRouter;
