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
  const [cryptoRate, setCryptoRate] = useState('');
  const [currRate, setCurrRate] = useState('');

  useEffect(() => {
    const socket = openSocket("http://localhost:8080");
    socket.on("ratedatasaved", (data) => {
      console.log(data);
    });
  }, []);

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
      let currentCurrencyRate = inputCurrValue * 0.0003;
      setInputCryptoValue(currentCurrencyRate);
    }
  }

  const onChangeCurrSelectHandler = (event) => {
    setCurrName(event.target.value);
    const isInputDisabled = checkChangedInput('crypto');

    if(!isInputDisabled) {
      let currentCryptoRate = inputCryptoValue / 0.0003;
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
