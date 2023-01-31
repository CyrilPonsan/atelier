const {
  Ticket,
  Materiel,
  Client,
  Intervention,
  Statut,
  Conseiller,
  RaisonSociale,
  TypeMateriel,
  Modele,
  Marque,
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
            model: Conseiller,
            as: "conseiller",
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
            include: [
              {
                model: RaisonSociale,
                as: "raisonSociale",
                attributes: ["raisonSociale"],
              },
            ],
            attributes: ["id"],
          },
          {
            model: TypeMateriel,
            as: "typeMateriel",
            attributes: ["type"],
          },
          {
            model: Marque,
            as: "marque",
            attributes: ["marque"],
          },
          {
            model: Modele,
            as: "modele",
            attributes: ["modele"],
          },
        ],
        attributes: ["id", "createdAt", "updatedAt", "miseEnService", "url"],
      },
    ],
    order: [["intervention", "date", "DESC"]],
  });
}

module.exports = { getTicketDetails };
