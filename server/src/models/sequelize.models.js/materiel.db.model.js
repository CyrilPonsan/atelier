function materielModel(sequelize, DataTypes) {
  return sequelize.define("materiel", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modele: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    miseEnService: {
      type: DataTypes.DATE,
      allowNull: true, // à confirmer
    },
    etat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true, //  à confirmer
    },
  });
}

module.exports = materielModel;
