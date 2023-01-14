require("dotenv").config();

const { resetDB, Statut } = require("../../services/sequelize");

resetDB();
