const axios = require("axios");

class RapidApiHelper {
  #apiKey = "8d780be631msh8a6ccd188f9f4f4p196937jsnb18e3eb2d7d6";
  #host = "currencyapi-net.p.rapidapi.com";
  #url = "https://currencyapi-net.p.rapidapi.com/rates";

  constructor() {
    if (typeof RapidApiHelper.instance === "object") {
      return RapidApiHelper.instance;
    }
    RapidApiHelper.instance = this;
    return RapidApiHelper.instance;
  }

  getRates(currency = "USD") {
    const options = {
      method: "GET",
      url: this.#url,
      params: { output: "JSON", base: currency },
      headers: {
        "X-RapidAPI-Host": this.#host,
        "X-RapidAPI-Key": this.#apiKey,
      },
    };

    const dataPromise = axios.request(options);
    return dataPromise;
  }
}

module.exports = RapidApiHelper;
