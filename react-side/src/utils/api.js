class ApiRequest {
  static fetchRate(currency = 'USD') {
    const apiKey = "8d780be631msh8a6ccd188f9f4f4p196937jsnb18e3eb2d7d6";
    const host = "currencyapi-net.p.rapidapi.com";
    const url = "https://currencyapi-net.p.rapidapi.com/rates";

    return fetch(url, {
      method: "GET",
      url: url,
      params: { output: "JSON", base: currency },
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
  }
  
  static saveControlsData(data) {
    fetch('http://localhost:8080/currency', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
  }
}

export default ApiRequest;