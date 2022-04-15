import React from "react";
import Button from "@mui/material/Button";

const CustomButton = (props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={props.onClickHandler}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
