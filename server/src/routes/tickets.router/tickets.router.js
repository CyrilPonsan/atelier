const express = require("express");
const { checkTokenValidity } = require("../../middlewares/auth.middleware");
const {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
} = require("./tickets.controller");

const ticketsRouter = express.Router();

ticketsRouter.get("/", checkTokenValidity, httpGetTickets);
ticketsRouter.get("/details/:ref", checkTokenValidity, httpGetTicketDetails);
ticketsRouter.get("/statuts", checkTokenValidity, httpGetTicketStatutsList);

module.exports = { ticketsRouter };
