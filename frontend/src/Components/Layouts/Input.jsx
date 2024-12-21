import React, { useState, useEffect } from "react";
import "../../assets/CSS/input.css";
import eye_icon from "../../assets/Media/eye-icon.png";

function Input(params) {
  const [type, setType] = useState(params.type);
  const [isEyeVisible, setIsEyeVisible] = useState();


  /*the eye icon is shown only
   when the input type is "password */
  useEffect(() => {
    if (params.type == "password") {
      setIsEyeVisible(true);
    }
  }, []);

  function handleChange(event) {
    params.stateChanger(event.target.value);
  }
  function toggleVisibility(event) {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  let eye_style = {
    width: "23px",
    height: "23px",
    position:"absolute",
    marginLeft: "78%",
    marginTop: "-12%"
  };
  
  return (
    <>
      <input
        type={type}
        placeholder={params.text}
        // This binds the initial text value of the input
        // to params.initText,
        //  which allows the input to be pre-filled with some value.
        value={params.initText} 
        className={"input " + params.border}
        onChange={handleChange}
      />
      {isEyeVisible && (
        <img src={eye_icon} style={eye_style} onClick={toggleVisibility} />
      )}
    </>
  );
}

export default Input;