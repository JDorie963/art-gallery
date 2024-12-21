import React from "react";
import "../../assets/CSS/image.css";

function Image(params) {
  let style = {
    width: params.width,
    height: params.height,
    left: params.left,
  };

  return <img src={params.src} className={"image " + params.shape} style={style} />;
}

export default Image;