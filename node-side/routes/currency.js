const express = require("express");
var cors = require("cors");

const CurrencyController = require("../controllers/CurrencyController");
const currencyControllerInstance = new CurrencyController();

const router = express.Router();

router.use(cors({origin: 'http://localhost:3000', methods: ['GET', 'POST']}));

router.get(
  "/currency",
  currencyControllerInstance.getCurrency.bind(new CurrencyController())
);

router.post(
  "/currency",
  currencyControllerInstance.saveCurrency.bind(new CurrencyController())
);

module.exports = router;
