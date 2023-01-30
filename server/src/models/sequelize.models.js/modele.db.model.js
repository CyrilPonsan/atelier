function modeleModel(sequelize, DataTypes) {
  return sequelize.define(
    "modele",
    {
      modele: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
}

module.exports = modeleModel;
