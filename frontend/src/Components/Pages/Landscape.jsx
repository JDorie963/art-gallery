import React from "react";
import "../../assets/CSS/button.css";
import Link from "../Layouts/Link";
import rotate_image from "../../assets/Media/rotate.png";

function Landscape(params) {
  return (
    <>
      <Link marginTop={"12%"} text="Please rotate your mobile phone!" />
      <img style={{marginLeft: "40%", width: "20%"}} src={rotate_image} />
    </>
  );
}

export default Landscape;