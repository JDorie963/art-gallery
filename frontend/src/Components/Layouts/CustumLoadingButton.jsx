import React from "react";
import "../../assets/CSS/button.css";
import ReactLoading from "react-loading";
import Text from "./Text";

function CustomLoadingButton(params) {

  return (
    <>
        <button className="button">
        {/* This will display a bubble-style loading animation inside the
         button to indicate that something is loading or in progress. */}
        <ReactLoading type="bubbles" />
        </button>
        {params.text && <Text text={"this might take some time"} />}
    </>
  );
}

export default CustomLoadingButton;