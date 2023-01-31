const { Ticket, Intervention } = require("../../services/sequelize");
const { _setRandomNumber } = require("../data");

require("dotenv").config;

let date = new Date("2021, 01, 01");
let day = 0;

async function createTickets() {
  let ref = 5000;
  const tickets = [];
  for (let i = 1; i <= 25; i++) {
    tickets.push({
      ref: ref,
      materiel_id: _setRandomNumber(1, 1500),
      titre: "en panne",
      resume: "lorem lorem",
    });
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
      conseiller_id: 1,
      titre: "depannage 1",
      lieuIntervention: "distance",
    });
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 2,
      conseiller_id: 1,
      titre: "depannage 2",
      lieuIntervention: "distance",
    });
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 4,
      conseiller_id: 1,
      titre: "depannage 3",
      lieuIntervention: "distance",
    });
    interventions.push({
      date: _addDays(date, day++),
      description: "Lorem Ipsum bla bla bla",
      reponse: "Ipsum Lorem bla bla bla",
      ticket_id: i,
      statut_id: 5,
      conseiller_id: 2,
      lieuIntervention: "distance",
      titre: "depannage 4",
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
