import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./CustomSelect.css";

const menuItemStyle = {
  "&": {
    backgroundColor: "#fff",
  },
  "& .option-wrapper": {
    display: 'flex',
    alignItems: "center"
  },
  "& .option-wrapper img": {
    width: '25px',
    height: "25px",
    marginRight: '10px'
  },
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
};

const CustomSelect = (props) => {
  return (
    <FormControl fullWidth>
      <Select
        id="demo-simple-select"
        displayEmpty
        className="custom-select"
        value={props.selectValue}
        onChange={props.onChangeHandler}
        sx={{ ...props.styleSelectObject }}
      >
        <MenuItem sx={{ ...menuItemStyle }} disabled value="">
          Select
        </MenuItem>
        {props.items.map((el, idx) => {
          return (
            <MenuItem
              sx={{ ...menuItemStyle }}
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
