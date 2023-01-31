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
  const off = req.query.off;
  const lmt = req.query.lmt;
  console.log(req.query);

  if (
    !userId ||
    !regexNumber.test(userId) ||
    !off ||
    !regexNumber.test(off) ||
    !lmt ||
    !regexNumber.test(lmt)
  ) {
    return res.status(400).json({ message: badQuery });
  }

  try {
    let tickets = await getTickets(userId);
    const total = tickets.length;
    tickets = _filtrageCourriers(tickets, +off, +lmt);
    return res.status(200).json({
      message:
        tickets.length === 0 ? "liste vide" : "tickets récupérés avec succès",
      total: total,
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

//  filtrage des courriers, filter = true : historique, filter = false : envois en cours
const _filtrageCourriers = (tab, offset, limit) => {
  console.log("limit", limit);
  let size;
  if (tab.length < limit * (offset + 1)) {
    size = tab.length;
  } else {
    size = limit * (offset + 1);
  }
  let tmp = [];
  for (let i = offset * limit; i < size; i++) {
    tmp = [...tmp, tab[i]];
  }
  console.log("size", tmp.length);
  return tmp;
};

module.exports = {
  httpGetTickets,
  httpGetTicketDetails,
  httpGetTicketStatutsList,
};
