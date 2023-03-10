const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { initDB } = require("./services/sequelize");
const api = require("./routes/v1.router");

const app = express();

//  initialise la bdd
initDB();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  //res.send("coucou");
});

module.exports = app;
