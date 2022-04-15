import React, { useState, useEffect, useReducer } from "react";
import openSocket from "socket.io-client";

import ExchangeControl from "./ExchangeControl/ExchangeControl";
import CustomButton from "../UI/Button/CutsomButton";
import ApiRequest from "../../utils/api";

import { AVAILABLE_CRYPTO_CURRENCY, AVAILABLE_CURRENCY } from "../../constants/constants";

import "./ExchangeControls.css";

const initialState = {inputType: '', inputValue: '', inputObject: {crypto: '', curr: ''}};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATING_INPUT':
      return {...state, inputType: action.payload.inputType, inputObject: {[action.payload.inputType]: action.payload.inputValue}};
    case 'UPDATING_INPUT_VALUE':
      return {...state, inputObject: {[action.payload.inputType]: action.payload.inputValue}};
    default:
      throw new Error();
  }
}

const ExchangeControls = () => {
  const [cryptoName, setCryptoName] = useState('');
  const [currName, setCurrName] = useState('');
  const [inputCryptoValue, setInputCryptoValue] = useState('');
  const [inputCurrValue, setInputCurrValue] = useState('');
  const [cryptoRate, setCryptoRate] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const dataPromise = ApiRequest.fetchRate();
    dataPromise.then(res => res.json()).then((res) => setCryptoRate({'BTC': res.rates['BTC'], 'ETH': res.rates['ETH']}))
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

  const onChangeCryptoSelectHandler = (event) => {
    setCryptoName(event.target.value);

    if(state.inputType !== 'crypto') {
      let currentCurrencyRate = state.inputObject['curr'] * cryptoRate[event.target.value];
      dispatch({type: 'UPDATING_INPUT_VALUE', payload: {inputType: 'crypto', inputValue: currentCurrencyRate}});
    }
  }

  const onChangeCurrSelectHandler = (event) => {
    setCurrName(event.target.value);

    if(state.inputType !== 'curr') {
      let currentCryptoRate = state.inputObject['crypto'] / cryptoRate[cryptoName];
      dispatch({type: 'UPDATING_INPUT_VALUE', payload: {inputType: 'curr', inputValue: currentCryptoRate}});
    }
  }

  const onChangeInputHandler = (inputType) => (event) => {
      dispatch({type: 'UPDATING_INPUT', payload: {inputType, inputValue: event.target.value}});
  };

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
            onInputChangeHandler={onChangeInputHandler('crypto')}
            inputValue={state.inputObject['crypto']}
            selectLabel="Currency From"
            inputLabel="Amount 1"
            inputDisabled={state.inputType && state.inputType !== 'crypto'}
          />
          <span className="equal-sign-divider">=</span>
          <ExchangeControl
            items={AVAILABLE_CURRENCY}
            selectValue={currName}
            onChangeHandler={onChangeCurrSelectHandler}
            onInputChangeHandler={onChangeInputHandler('curr')}
            inputValue={state.inputObject['curr']}
            selectLabel="Currency to"
            inputLabel="Amount 2"
            inputDisabled={state.inputType && state.inputType !== 'curr'}
          />
          <CustomButton text="Save" onClickHandler={onClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default ExchangeControls;
