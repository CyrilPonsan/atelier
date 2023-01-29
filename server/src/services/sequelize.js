const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/sequelize.models.js/user.db.model");
const ClientModel = require("../models/sequelize.models.js/client.db.model");
const TicketModel = require("../models/sequelize.models.js/ticket.db.model");
const MaterielModel = require("../models/sequelize.models.js/materiel.db.model");
const StatutModel = require("../models/sequelize.models.js/statut.model");
const InterventionModel = require("../models/sequelize.models.js/intervention.db.model");

//  paramètres de connexion à la bdd

let sequelize;

if (process.env.NODE8ENV === "development") {
  console.log("dev environment");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      define: { freezeTableName: true },
      host: process.env.DB_HOST,
      dialect: "mariadb",
      dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock",
      },
      logging: false,
    }
  );
} else {
  console.log("prod environment");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      define: { freezeTableName: true },
      host: process.env.DB_HOST,
      dialect: "mariadb",
      dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock",
      },
      logging: false,
    }
  );
}

//  entités de la bdd

const User = UserModel(sequelize, DataTypes);
const Client = ClientModel(sequelize, DataTypes);
const Ticket = TicketModel(sequelize, DataTypes);
const Materiel = MaterielModel(sequelize, DataTypes);
const Statut = StatutModel(sequelize, DataTypes);
const Intervention = InterventionModel(sequelize, DataTypes);

//  relations

/**
 * relation ManyToOne entre ticket et intervention
 * un ticket peut avoir plusieurs interventions et
 * une intervention ne peut être associée qu'à un
 * seul ticket
 */
Ticket.hasMany(Intervention, { as: "intervention", foreignKey: "ticket_id" });
Intervention.belongsTo(Ticket, { foreignKey: "ticket_id", as: "ticket" });

/**
 * relation ManyToOne entre materiel et ticket
 * un materiel peut avoir plusieurs tickets
 * un ticket n'est rattaché qu'à un seul materiel
 */
Materiel.hasMany(Ticket, { as: "ticket", foreignKey: "materiel_id" });
Ticket.belongsTo(Materiel, { foreignKey: "materiel_id", as: "materiel" });

/**
 * relation ManyToOne entre client et materiel
 * un client peut avoir plusieurs materiel
 * un materiel n'est rattaché qu'à un seul client
 */
Client.hasMany(Materiel, { as: "materiel", foreignKey: "client_id" });
Materiel.belongsTo(Client, { foreignKey: "client_id", as: "client" });

/**
 * relation ManyToOne entre user et intervention
 * un user peut avoir plusieurs interventions
 * une intervention n'est rattaché qu'à un seul client
 */
User.hasMany(Intervention, { as: "intervention", foreignKey: "user_id" });
Intervention.belongsTo(User, { foreignKey: "user_id", as: "user" });

/**
 * relation OneToOne entre statut et intervention
 */
Intervention.belongsTo(Statut, { foreignKey: "statut_id", as: "statut" });

//  initialisation à la bdd

function initDB() {
  return sequelize
    .sync({ alter: true })
    .then(() => console.log("Base de données initialisée."))
    .catch((error) =>
      console.log(`La base de données n'a pas été initialisée: ${error}`)
    );
}

//  reset bdd, utiliser le script "resetDB.js" pour remplir la table "statut"

function resetDB() {
  return sequelize
    .sync({ force: true })
    .then(() => console.log("Base de données réinitialisée."))
    .catch((error) =>
      console.log(`La base de données n'a pas été réinitialisée: ${error}`)
    );
}

module.exports = {
  initDB,
  resetDB,
  User,
  Client,
  Intervention,
  Materiel,
  Ticket,
  Statut,
  sequelize,
};
