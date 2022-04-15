const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

const currencyRoutes = require("./routes/currency");

app.use(bodyParser.json());

app.use(currencyRoutes);

mongoConnect(() => {
  const server = app.listen(8080);
  const io = require("./socket").init(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  const ExternalApiController = require("./controllers/ExternalApiController");
  const externalApiInstance = new ExternalApiController();
  externalApiInstance.fetchDataFromApisWithInterval();

  io.on("connection", (socket) => {
    console.log("Client connected");
  });
});
