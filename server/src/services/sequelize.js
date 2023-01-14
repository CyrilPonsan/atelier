const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/sequelize.models.js/user.db.model");
const ClientModel = require("../models/sequelize.models.js/client.db.model");

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
}

const User = UserModel(sequelize, DataTypes);
const Client = ClientModel(sequelize, DataTypes);

function initDB() {
  return sequelize
    .sync()
    .then(() => console.log("Base de donnée initialisée."))
    .catch((error) =>
      console.log(`La base de donnée n'a pas été inistialisée: ${error}`)
    );
}

module.exports = { initDB, User, Client };
