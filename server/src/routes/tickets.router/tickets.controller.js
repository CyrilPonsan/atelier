const {
  getTicketDetails,
} = require("../../models/ticket.model/getTicketDetails");
const {
  getTickets,
  getTotalTickets,
} = require("../../models/ticket.model/getTickets");
const {
  getTicketsStatutsList,
} = require("../../models/ticket.model/getTicketStatutsList");
const { getPagination } = require("../../services/queryService");
const {
  regexNumber,
  badQuery,
  serverIssue,
  noData,
} = require("../../utils/data");

async function httpGetTickets(req, res) {
  const userId = 1; //req.auth.userId;
  const page = req.query.page;
  const limit = req.query.lmt;
  console.log(req.query);

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
    let tickets = await getTickets(getPagination(+page, +limit), +limit);
    const total = await getTotalTickets();

    return res.status(200).json({
      message:
        tickets.length === 0 ? "liste vide" : "tickets récupérés avec succès",
      data: tickets,
      total: total,
    });
  } catch (err) {
    return res.status(500).json({ message: serverIssue + err });
  }
}

async function httpGetTicketDetails(req, res) {
  const ticketRef = req.params.ref;

  if (!ticketRef || !regexNumber.test(ticketRef)) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    const ticketDetails = await getTicketDetails(ticketRef);

    if (!ticketDetails) {
      return res.status(404).json({ message: noData });
    }

    return res.status(200).json(ticketDetails);
  } catch (error) {
    return res.status(500).json({ message: serverIssue });
  }
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
