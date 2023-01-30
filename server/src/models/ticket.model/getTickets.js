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
  RaisonSociale,
  TypeMateriel,
} = require("../../services/sequelize");

async function getTickets(userId, offset, limit) {
  const tickets = await Ticket.findAll({
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
          },
          {
            model: TypeMateriel,
            as: "typeMateriel",
            attributes: ["type"],
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
  return _filtrageCourriers(tickets, 1, 15);
}

//  filtrage des courriers, filter = true : historique, filter = false : envois en cours
const _filtrageCourriers = (tab, offset, limit) => {
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
  return tmp;
};

module.exports = { getTickets };
