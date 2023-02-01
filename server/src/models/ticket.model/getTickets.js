const { off } = require("superagent");
const { getPagination } = require("../../services/queryService");
const {
  Ticket,
  Materiel,
  Client,
  Intervention,
  Statut,
  sequelize,
  RaisonSociale,
  TypeMateriel,
} = require("../../services/sequelize");

async function getTickets(offset, limit) {
  return await Ticket.findAll({
    include: [
      {
        model: Intervention,
        as: "intervention",
        attributes: ["id"],
        include: [
          {
            model: Statut,
            as: "statut",
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
        ],
        attributes: ["id"],
      },
    ],
    attributes: [
      "id",
      "ref",
      [sequelize.fn("MAX", sequelize.col("date")), "date"],
      [sequelize.fn("MAX", sequelize.col("code")), "code"],
    ],
    group: ["intervention.ticket_id"],
    order: [["date", "DESC"]],
    offset: offset,
    limit: limit,
    subQuery: false,
  });
}

async function getTotalTickets() {
  return await Ticket.count();
}

module.exports = { getTickets, getTotalTickets };
