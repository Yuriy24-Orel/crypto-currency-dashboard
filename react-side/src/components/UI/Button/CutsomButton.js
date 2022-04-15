import React from "react";
import Button from "@mui/material/Button";

const CustomButton = (props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={props.onClickHandler}
      sx={props.styleObject ? { ...props.styleObject } : {}}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
