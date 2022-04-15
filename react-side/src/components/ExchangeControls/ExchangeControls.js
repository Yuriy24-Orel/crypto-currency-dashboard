import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import ExchangeControl from "./ExchangeControl/ExchangeControl";
import CustomButton from "../UI/Button/CutsomButton";
import ApiRequest from "../../utils/api";

import { AVAILABLE_CRYPTO_CURRENCY, AVAILABLE_CURRENCY } from "../../constants/constants";

import "./ExchangeControls.css";

const ExchangeControls = () => {
  const [disableInputType, setDisableInputType] = useState('');
  const [cryptoName, setCryptoName] = useState('');
  const [currName, setCurrName] = useState('');
  const [inputCryptoValue, setInputCryptoValue] = useState('');
  const [inputCurrValue, setInputCurrValue] = useState('');
  const [cryptoRate, setCryptoRate] = useState({});

  useEffect(() => {
    ApiRequest.fetchRate();
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

  const checkChangedInput = (inputType) => { 
    if(!disableInputType) {
      setDisableInputType(inputType);
    }
    return disableInputType === inputType;
  }

  const onChangeCryptoSelectHandler = (event) => {
    setCryptoName(event.target.value);
    const isInputDisabled = checkChangedInput('curr');

    if(!isInputDisabled) {
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
    ApiRequest.saveControlsData(data);
  }

  return (
    <div className="exchange-controls-container">
      <div className="exchange-controls-section">
        <h2>Exchange</h2>
        <div className="currency-controls-container">
          <ExchangeControl
            items={AVAILABLE_CRYPTO_CURRENCY}
            selectValue={cryptoName}
            onChangeHandler={onChangeCryptoSelectHandler}
            onInputChangeHandler={onChangeCryptoInputHandler}
            inputValue={inputCryptoValue}
            selectLabel="Currency From"
            inputLabel="Amount 1"
            inputDisabled={disableInputType && disableInputType === 'crypto'}
          />
          <span className="equal-sign-divider">=</span>
          <ExchangeControl
            items={AVAILABLE_CURRENCY}
            selectValue={currName}
            onChangeHandler={onChangeCurrSelectHandler}
            onInputChangeHandler={onChangeCurrInputHandler}
            inputValue={inputCurrValue}
            selectLabel="Currency to"
            inputLabel="Amount 2"
            inputDisabled={disableInputType && disableInputType === 'curr'}
          />
          <CustomButton text="Save" onClickHandler={onClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default ExchangeControls;
