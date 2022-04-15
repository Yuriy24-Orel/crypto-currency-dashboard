import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import ExchangeControl from "./ExchangeControl/ExchangeControl";
import CustomButton from "../UI/Button/CutsomButton";

import bitcoin from './img/bitcoin.png';
import ethereum from './img/ethereum.png';
import usa from './img/usa.png';

import "./ExchangeControls.css";

const AVAILABLE_CRYPTO_CURRENCY = [{name: "BTC", imgUrl: bitcoin}, {name: "ETH", imgUrl: ethereum}];
const AVAILABLE_CURRENCY = [{name: "USD", imgUrl: usa }];

const styleButtonObject = {
  width: "7em",
  padding: "10px 16px"
};

const styleSelectObject = {
  "& .MuiSelect-select": {
    padding: "10px",
  },
};

const styleInputObject = {
  "& .MuiOutlinedInput-root": {
    padding: "10px 14px",
  },
};

const ExchangeControls = () => {
  const [data, setData] = useState([]);
  const [disableInputType, setDisableInputType] = useState('');
  const [cryptoName, setCryptoName] = useState('');
  const [currName, setCurrName] = useState('');
  const [inputCryptoValue, setInputCryptoValue] = useState('');
  const [inputCurrValue, setInputCurrValue] = useState('');
  const [cryptoRate, setCryptoRate] = useState({});

  useEffect(() => {
    fetchRate();
    const socket = openSocket("http://localhost:8080");
    socket.on("ratedatasaved", (data) => {
      const objectRate = data.rateData.reduce((object, el) => {
        if(el.cryptoCurrencyRate) {
          object[el.cryptoCurrencyName] = el.cryptoCurrencyRate;
        }
        return object;
      }, {})
      setCryptoRate(objectRate);
    });
  }, []);

  const fetchRate = (currency = 'USD') => {
    const apiKey = "8d780be631msh8a6ccd188f9f4f4p196937jsnb18e3eb2d7d6";
    const host = "currencyapi-net.p.rapidapi.com";
    const url = "https://currencyapi-net.p.rapidapi.com/rates";

    fetch(url, {
      method: "GET",
      url: url,
      params: { output: "JSON", base: currency },
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    }).then((res) => {
      return res.json();
    })
    .then((res) => {
      setCryptoRate({'BTC': res.rates['BTC'], 'ETH': res.rates['ETH']})
    })
  }

  const checkChangedInput = (inputType) => {
    if(disableInputType === inputType) {
      return true;
    }

    if(!disableInputType) {
      setDisableInputType(inputType);
      return true;
    }

    return false;
  }

  const onChangeCryptoSelectHandler = (event) => {
    setCryptoName(event.target.value);
    const isInputDisabled = checkChangedInput('curr');

    if(!isInputDisabled) {
      console.log(cryptoRate, cryptoName)
      let currentCurrencyRate = inputCurrValue * cryptoRate[event.target.value];
      setInputCryptoValue(currentCurrencyRate);
    }
  }

  const onChangeCurrSelectHandler = (event) => {
    setCurrName(event.target.value);
    const isInputDisabled = checkChangedInput('crypto');

    if(!isInputDisabled) {
      let currentCryptoRate = inputCryptoValue / cryptoRate[cryptoName];
      setInputCurrValue(Math.floor(currentCryptoRate));
    }
  }

  const onChangeCryptoInputHandler = (event) => {
    checkChangedInput('curr');

    if(cryptoName) {
      setInputCryptoValue(event.target.value);
    }
  }

  const onChangeCurrInputHandler = (event) => {
    checkChangedInput('crypto');

    if(currName) {
      setInputCurrValue(event.target.value);
    }
  }

  const onClickHandler = () => {
    const data = {
      currencyFrom: cryptoName,
      amount1: inputCryptoValue,
      currencyTo: currName,
      amount2: inputCurrValue,
      type: 'Exchanged'
    }
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

  return (
    <div className="exchange-controls-container">
      <div className="exchange-controls-section">
        <h2>Exchange</h2>
        <div className="currency-controls-container">
          <ExchangeControl
            items={AVAILABLE_CRYPTO_CURRENCY}
            styleSelectObject={styleSelectObject}
            styleInputObject={styleInputObject}
            selectValue={cryptoName}
            onChangeHandler={onChangeCryptoSelectHandler}
            onInputChangeHandler={onChangeCryptoInputHandler}
            inputValue={inputCryptoValue}
            selectLabel="Currency From"
            inputLabel="Amount 1"
            inputDisabled={disableInputType && disableInputType === 'crypto' ? true : false}
          />
          <span className="equal-sign-divider">=</span>
          <ExchangeControl
            items={AVAILABLE_CURRENCY}
            styleSelectObject={styleSelectObject}
            styleInputObject={styleInputObject}
            selectValue={currName}
            onChangeHandler={onChangeCurrSelectHandler}
            onInputChangeHandler={onChangeCurrInputHandler}
            inputValue={inputCurrValue}
            selectLabel="Currency to"
            inputLabel="Amount 2"
            inputDisabled={disableInputType && disableInputType === 'curr' ? true : false}
          />
          <CustomButton text="Save" styleObject={styleButtonObject} onClickHandler={onClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default ExchangeControls;
