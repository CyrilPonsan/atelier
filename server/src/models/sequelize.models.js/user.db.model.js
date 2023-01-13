function userModel(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Cet email n'est pas disponible." },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roles: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: function (user) {
          user.nom = user.nom.toLowerCase();
          user.fonction = user.fonction.toLowerCase();
        },
      },
    }
  );
}

module.exports = userModel;
