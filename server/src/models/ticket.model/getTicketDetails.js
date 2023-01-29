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
        attributes: ["id", "date", "description", "reponse"],
        include: [
          {
            model: Statut,
            as: "statut",
            attributes: ["id", "label"],
          },
          {
            model: User,
            as: "user",
            attributes: ["id", "nom"],
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
            attributes: ["id", "raisonSociale"],
          },
        ],
        attributes: [
          "id",
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
