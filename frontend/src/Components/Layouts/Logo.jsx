import apgal_logo from "../../assets/Media/apgal.png";
import React from "react";

function Logo(params) {
  const mystyle = {
    marginLeft: "" + (100 - params.width) / 2 + "%",
    width: "" + params.width + "%",
  };

  return (
    <>
      <img style={mystyle} src={apgal_logo} className="logo" />
    </>
  );
}

export default Logo;