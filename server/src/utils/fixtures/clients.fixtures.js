require("dotenv").config();

const { Client } = require("../../services/sequelize");

const clients = [];
let contrat = 1000;

function createClients() {
  for (let i = 0; i < 50; i++) {
    const client = {
      raisonSociale: `Entreprise n° ${i + 1}`,
      contact: `contact_${i + 1}@entreprise.com`,
      numeroContrat: contrat++,
      telephone: i + 1 < 10 ? `00${i + 1}` : `0${i + 1}`,
      adresse: `${i + 1} rue du Business`,
      codePostal: "64000",
      ville: "San Francisco sur Adour",
    };
    clients.push(client);
  }
}

async function saveClients() {
  const newClients = await Client.bulkCreate(clients);
}

async function createClientsFixtures() {
  await createClients();
  await saveClients();
}

//createClientsFixtures();

module.exports = createClientsFixtures;
