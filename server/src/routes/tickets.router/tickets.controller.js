const {
  getTicketDetails,
} = require("../../models/ticket.model/getTicketDetails");
const { getTickets } = require("../../models/ticket.model/getTickets");
const {
  getTicketsStatutsList,
} = require("../../models/ticket.model/getTicketStatutsList");
const { getPagination } = require("../../services/queryService");
const { regexNumber, badQuery, serverIssue } = require("../../utils/data");

async function httpGetTickets(req, res) {
  const userId = 1; //req.auth.userId;
  const page = req.query.page || 1;
  const limit = req.query.lmt || 10;

  if (
    !userId ||
    !regexNumber.test(userId) ||
    !page ||
    !regexNumber.test(page) ||
    !limit ||
    !regexNumber.test(limit)
  ) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    const offset = getPagination(page);
    const tickets = await getTickets(userId, offset, limit);
    return res.status(200).json({
      message:
        tickets.length === 0 ? "liste vide" : "tickets récupérés avec succès",
      total: tickets.length,
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetTicketDetails(req, res) {
  const ticketId = req.params.id;
  const ticketDetails = await getTicketDetails(ticketId);
  return res.status(200).json(ticketDetails);
}

async function httpGetTicketStatutsList(req, res) {
  try {
    const statuts = await getTicketsStatutsList();
    return res.status(200).json({ data: statuts });
  } catch (error) {
    return res.status(500).json({ message: serverIssue });
  }
}

module.exports = {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
};
