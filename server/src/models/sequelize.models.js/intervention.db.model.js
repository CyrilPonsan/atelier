function interventionModel(sequeleize, DataTypes) {
  return sequeleize.define(
    "intervention",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reponse: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
}

module.exports = interventionModel;
