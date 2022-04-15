const CurrencyModel = require('../models/CurrencyRateModel');
const io = require('../socket');

class CurrencyController {
  constructor(){}
  
  getCurrency(req, res) {
    res.send({message: 'getCurrency'});
  }

  saveCurrency(req, res) {
    let currentdate = new Date();
    let datetime = 
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const currencyModelInstance = new CurrencyModel(datetime, req.body.currencyTo, req.body.currencyFrom, '', 'Exchanged', req.body.amount1, req.body.amount2);
    currencyModelInstance.saveRateWithRequest();
    this.sendDataToClientSide();
    res.send({message: 'Data were saved'});
  }

  async sendDataToClientSide() {
    const currencyModelInstance = new CurrencyModel();
    const rateData = await currencyModelInstance.getRateData();
    io.getIO().emit('ratedatasaved', {action: 'saved',  rateData: rateData})
  }
}

module.exports = CurrencyController;