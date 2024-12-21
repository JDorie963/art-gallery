import React from "react";
import "../../assets/CSS/title.css";

function Title(params) {
  return <p className="purple-title" style={{width: params.width}}>{params.text}</p>;
}

export default Title;