function clientModel(sequelize, DataTypes) {
  return sequelize.define(
    "client",
    {
      raisonSociale: {
        type: DataTypes.STRING,
        allownull: false,
        unique: {
          msg: "Cette raison sociale est déjà enregistrée auprès de nos services.",
        },
      },
      contact: {
        type: DataTypes.STRING,
        allownull: false,
      },
      numeroContrat: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allownull: false,
      },
      adresse: {
        type: DataTypes.STRING,
        allownull: false,
      },
      codePostal: {
        type: DataTypes.STRING,
        allownull: false,
      },
      ville: {
        type: DataTypes.STRING,
        allownull: false,
      },
    },
    {
      hooks: {
        beforeCreate: function (user) {
          user.fonction = user.fonction.toLowerCase();
        },
      },
    }
  );
}

module.exports = clientModel;
