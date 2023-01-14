require("dotenv").config();

const { Materiel } = require("../../services/sequelize");

url =
  "https://worldofwarcraft.com/fr-fr/character/eu/dalaran/bab%C3%B8ul%C3%AFnet";

async function createParc() {
  for (let j = 1; j <= 50; j++) {
    const parc = [];
    parc.push({
      type: "serveur",
      marque: "tata",
      modele: "mega server",
      miseEnService: new Date(),
      etat: true,
      url: url,
      client_id: j,
    });
    for (let i = 0; i < 2; i++) {
      parc.push({
        type: "serveur",
        marque: "tata",
        modele: "super server",
        miseEnService: new Date(),
        etat: true,
        url: url,
        client_id: j,
      });
    }
    for (let i = 0; i < 30; i++) {
      parc.push({
        type: "terminal",
        marque: "toto",
        modele: "toto-book",
        miseEnService: new Date(),
        etat: true,
        url: url,
        client_id: j,
      });
    }
    for (let i = 0; i < 5; i++) {
      parc.push({
        type: "imprimante",
        marque: "toto",
        modele: "toto-printer",
        miseEnService: new Date(),
        etat: true,
        url: url,
        client_id: j,
      });
    }
    await Materiel.bulkCreate(parc);
  }
}

async function createMaterielFixtures() {
  await createParc();
}

//createMaterielFixtures();

module.exports = { createMaterielFixtures };
