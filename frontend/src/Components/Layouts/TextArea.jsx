import React from "react";
import "../../assets/CSS/input.css";

function TextArea(params) {
  const handleChange = (event) => {
    params.stateChanger(event.target.value);
  };
  return (
    <textarea
      value={params.initText}
      placeholder={params.text}
      className="input text-area"
      onChange={handleChange}
    />
  );
}

export default TextArea;


/*
params.stateChanger(event.target.value):
This calls the stateChanger function passed in as a prop
from the parent component. 
event.target.value retrieves the current value of
 the <textarea>. So, whenever the user types,
  the function updates the parent component's 
state using the stateChanger function, passing the new value.
*/