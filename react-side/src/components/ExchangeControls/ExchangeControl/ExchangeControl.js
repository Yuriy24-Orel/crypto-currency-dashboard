import React from "react";

import CustomSelect from "../../UI/Select/CustomSelect";
import InputNumber from "../../UI/Input/InputNumber/InputNumber";

import "./ExchangeControl.css";

const ExchangeControl = (props) => {
  return (
    <div className="exchange-control-container">
      <div className="select-container">
        <label>{props.selectLabel}</label>
        <CustomSelect
          items={props.items}
          selectValue={props.selectValue}
          onChangeHandler={props.onChangeHandler}
        />
      </div>
      <div className="input-container">
        <label>{props.inputLabel}</label>
        <InputNumber
          onChangeHandler={props.onInputChangeHandler}
          inputDisabled={props.inputDisabled}
          inputValue={props.inputValue}
        />
      </div>
    </div>
  );
};

export default ExchangeControl;
