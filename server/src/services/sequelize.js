const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/sequelize.models.js/user.db.model");

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
}

const User = UserModel(sequelize, DataTypes);
