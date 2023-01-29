const { off } = require("superagent");
const { getPagination } = require("../../services/queryService");
const {
  Ticket,
  Materiel,
  Client,
  Intervention,
  Statut,
  sequelize,
  User,
} = require("../../services/sequelize");

async function getTickets(userId, offset, limit) {
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
            //attributes: [],
          } /* 
          {
            model: User,
            as: "user",
            attributes: ["id", "nom"],
          }, */,
        ],
      },
      {
        model: Materiel,
        as: "materiel",
        attributes: ["type"],
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["raisonSociale"],
          },
        ],
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
  });
}

module.exports = { getTickets };
