const createClientsFixtures = require("./clients.fixtures");
const { createMaterielFixtures } = require("./materiel.fixtures");
const { createStatutsFixtures } = require("./statuts.fixtures");

require("dotenv").config();

async function loadfixtures() {
  await createStatutsFixtures();
  await createClientsFixtures();
  await createMaterielFixtures();
}

loadfixtures();

console.log("Fixtures chargées !");
