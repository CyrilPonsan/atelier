const {
  Ticket,
  Materiel,
  Client,
  Intervention,
  Statut,
  User,
} = require("../../services/sequelize");

async function getTicketDetails(ticketId) {
  return await Ticket.findByPk(ticketId, {
    include: [
      {
        model: Intervention,
        as: "intervention",
        attributes: ["date"],
        include: [
          {
            model: Statut,
            as: "statut",
            attributes: ["label"],
          },
          {
            model: User,
            as: "user",
            attributes: ["nom"],
          },
        ],
      },
      {
        model: Materiel,
        as: "materiel",
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["raisonSociale"],
          },
        ],
        attributes: [
          "type",
          "marque",
          "modele",
          "createdAt",
          "updatedAt",
          "etat",
          "miseEnService",
          "url",
        ],
      },
    ],
  });
}

module.exports = { getTicketDetails };
