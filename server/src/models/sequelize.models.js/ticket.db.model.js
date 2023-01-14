function ticketModel(sequelize, DataTypes) {
  return sequelize.define(
    "ticket",
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
      refTicket: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
}

module.exports = ticketModel;
