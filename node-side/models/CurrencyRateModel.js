const getDb = require("../util/database").getDb;

class CurrencyRate {
  constructor(datetime, base, cryptoCurrencyName, cryptoCurrencyRate, type, amount1 = '', amount2 = '') {
    this.datetime = datetime;
    this.base = base;
    this.cryptoCurrencyName = cryptoCurrencyName;
    this.cryptoCurrencyRate = cryptoCurrencyRate;
    this.type = type;
    this.amount1 = amount1;
    this.amount2 = amount2;
  }

  saveRate() {
    const db = getDb();
 
    const options = { upsert: true };
    const dataPromise = db.collection("currenciesRate").updateOne(
      { base: this.base, cryptoCurrencyName: this.cryptoCurrencyName, type: 'Live Price' },
      { $set: this },
      options
    );
  }

  async saveRateWithRequest() {
    const db = getDb();
    const dataPromise = await db.collection("currenciesRate").insertOne(this);
  }

  async getRateData() {
    const db = getDb();
    const rateData = await db.collection("currenciesRate").find().toArray();
    return rateData;
  }
}

module.exports = CurrencyRate;
