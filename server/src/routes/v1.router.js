const express = require("express");
const authRouter = require("./auth.router/auth.router");
const { ticketsRouter } = require("./tickets.router/tickets.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/tickets", ticketsRouter);

module.exports = api;
