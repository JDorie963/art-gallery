import React from "react";
import Text from "./Text";
import "../../assets/CSS/title.css";

function PersonalCard(params) {
  return (
    <>
      <div style={{ width: "50%", float: "left", textAlign: "center" }}>
        <img src={params.image} />
        <Text text={params.name} />
        <div className="title blue" style={{ marginBottom: "30px" }}>
          {params.role}
        </div>
      </div>
    </>
  );
}

export default PersonalCard;