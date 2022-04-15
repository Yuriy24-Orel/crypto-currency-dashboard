import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./CustomSelect.css";

const CustomSelect = (props) => {
  return (
    <FormControl fullWidth>
      <Select
        id="demo-simple-select"
        displayEmpty
        className="custom-select"
        value={props.selectValue}
        onChange={props.onChangeHandler}
      >
        <MenuItem disabled value="">
          Select
        </MenuItem>
        {props.items.map((el, idx) => {
          return (
            <MenuItem
              key={`${el.name}-${idx}`}
              value={el.name}
            >
              <div className="option-wrapper">
                {el.imgUrl && <img src={el.imgUrl} />}
                <span>{el.name}</span>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
