const { off } = require("superagent");
const { getPagination } = require("../../services/queryService");
const {
  Ticket,
  Materiel,
  Client,
  Intervention,
  Statut,
  sequelize,
} = require("../../services/sequelize");

async function getTickets(userId, offset, limit) {
  return await Ticket.findAll({
    include: [
      {
        model: Intervention,
        as: "intervention",
        attributes: [],
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
        attributes: ["type"],
      },
    ],
    attributes: [
      "id",
      [sequelize.fn("MAX", sequelize.col("date")), "date"],
      [sequelize.fn("MAX", sequelize.col("code")), "code"],
    ],
    group: ["ticket_id"],
    order: [["date", "DESC"]],
  });
}

module.exports = { getTickets };
