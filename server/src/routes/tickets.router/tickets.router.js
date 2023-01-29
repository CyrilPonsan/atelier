const express = require("express");
const { checkTokenValidity } = require("../../middlewares/auth.middleware");
const {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
} = require("./tickets.controller");

const ticketsRouter = express.Router();

ticketsRouter.get("/", httpGetTickets);
ticketsRouter.get("/details/:id", httpGetTicketDetails);
ticketsRouter.get("/statuts", httpGetTicketStatutsList);

module.exports = { ticketsRouter };
