require("dotenv").config();

const { Statut } = require("../../services/sequelize");

const labels = ["ouvert", "traitement", "niveau 2", "validé", "clôturé"];

const statuts = [];

for (let i = 0; i < labels.length; i++) {
  statuts.push({
    code: i + 1,
    label: labels[i],
  });
}

async function createStatutsFixtures() {
  const newStatuts = await Statut.bulkCreate(statuts);
}

//createStatutsFixtures();

module.exports = { createStatutsFixtures };
