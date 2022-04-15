import React from "react";
import TextField from "@mui/material/TextField";

import "./InputNumber.css";

const InputNumber = (props) => {
  return (
    <TextField
      id="outlined-multiline-flexible"
      className="custom-input-number"
      hiddenLabel
      multiline
      disabled={props.inputDisabled}
      value={props.inputValue}
      maxRows={4}
      onChange={props.onChangeHandler}
    />
  );
};

export default InputNumber;
