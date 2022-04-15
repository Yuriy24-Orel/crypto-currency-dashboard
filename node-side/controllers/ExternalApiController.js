const RapidApiHelper = require("../helpers/RapidApiHelper");
const CurrencyModel = require("../models/CurrencyRateModel");
const io = require('../socket').getIO();
const moment = require('moment');

class ExternalApiController {
  #apiInstances = [];

  constructor() {
    this.#apiInstances.push(new RapidApiHelper());
  }

  fetchDataFromApisWithInterval(timeOut = 65000) {
    this.#apiInstances.forEach((el) => {
      setInterval(() => {
        const dataPromise = el.getRates();
        dataPromise.then((res) => {
          let datetime = moment().format('DD/MM/YYYY k:mm');
          for(let rate in res.data.rates) {
            if(rate == 'BTC' || rate == 'ETH') {
              const currencyModelInstance = new CurrencyModel(
                datetime,
                res.data.base,
                rate,
                res.data.rates[rate],
                'Live Price'
              );
              currencyModelInstance.saveRate();
            }
          }

          this.sendDataToClientSide();
        })
      }, timeOut)
    });
  }

  async sendDataToClientSide() {
    const currencyModelInstance = new CurrencyModel();
    const rateData = await currencyModelInstance.getRateData();
    io.emit('ratedatasaved', {action: 'saved',  rateData: rateData})
  }
}

module.exports = ExternalApiController;
