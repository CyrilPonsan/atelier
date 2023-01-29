const { Ticket, Intervention } = require("../../services/sequelize");

require("dotenv").config;

const _setRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

let date = new Date("2021, 01, 01");
let day = 0;

async function createTickets() {
  let ref = 5000;
  const tickets = [];
  for (let i = 1; i <= 25; i++) {
    tickets.push({ ref: ref, materiel_id: _setRandomNumber(1, 1901) });
    ref++;
  }
  const newTickets = await Ticket.bulkCreate(tickets);
  const interventions = [];
  for (let i = 1; i <= 25; i++) {
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 1,
      user_id: 1,
    });
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 2,
      user_id: 1,
    });
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 4,
      user_id: 1,
    });
    interventions.push({
      date: new Date(),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 5,
      user_id: 2,
    });
  }
  const newInterventions = await Intervention.bulkCreate(interventions);
}

const _addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

module.exports = { createTickets };
