const express = require("express");
const { checkTokenValidity } = require("../../middlewares/auth.middleware");
const {
  httpGetTickets,
  httpGetTicketDetails,
} = require("./tickets.controller");

const ticketsRouter = express.Router();

ticketsRouter.get("/", checkTokenValidity, httpGetTickets);
ticketsRouter.get("/details", httpGetTicketDetails);

module.exports = { ticketsRouter };
