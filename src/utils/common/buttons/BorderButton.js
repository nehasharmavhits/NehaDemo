import React from "react";
import Index from "../../../component/user/Index";

const BorderButton = (props) => {
  console.log(props, 5);
  return (
    <Index.Box>
      <Index.Button
        className={props.className}
        disabled={props.disabled}
        type={props.type}
        onClick={props.onClick}
        variant="contained"
      >
        <span>{props.btnLabel}</span>
      </Index.Button>
    </Index.Box>
  );
};

export default BorderButton;
