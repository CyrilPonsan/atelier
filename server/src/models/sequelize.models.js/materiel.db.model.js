function materielModel(sequelize, DataTypes) {
  return sequelize.define("materiel", {
    miseEnService: {
      type: DataTypes.DATE,
      allowNull: true, // à confirmer
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true, //  à confirmer
    },
  });
}

module.exports = materielModel;
