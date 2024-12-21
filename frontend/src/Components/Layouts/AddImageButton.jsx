
import React from "react";
import "../../assets/CSS/button.css";

function AddImageButton(params) {
  let style = {
    width: params.width,
    marginLeft: params.marginLeft,
  };


  /*
  This creates a React ref (hiddenFileInput) initialized to null.
  useRef hook allows you to reference a DOM element
  directly without re-rendering the component.
  Here used to reference the hidden <input type="file"> element.
  */
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    if (event.target.files) {
      await params.stateChanger(event.target.files[0]);
    }
  };

  return (
    <>
      <button
        className={"add-image-button " + params.shape}
        style={style}
        onClick={handleClick}
      >
        <div className="dummy" />
        {params.text}
      </button>

      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
}

export default AddImageButton;


/*
 const handleClick = (event) => { hiddenFileInput.current.click(); };
This is an event handler function for the button's onClick event.
 When the button is clicked, the function is called,
 and it programmatically triggers a click event on the hidden
  file input element (hiddenFileInput.current.click()).
   This effectively opens the file dialog, allowing the user to select a file.
7. const handleChange = async (event) => { if (event.target.files)
 { await params.stateChanger(event.target.files[0]); } };
This is an event handler for when the file input changes (when a user selects a file).
It checks if there are files selected by the user (if (event.target.files)).
If files are selected, it calls params.stateChanger,
 a function passed in as a prop. This function is expected to handle
  the file (in this case, likely updating the component's state
   or triggering a parent component's state update with the selected file).
The first file selected (event.target.files[0]) is passed to stateChanger.
 The await ensures that the state update happens asynchronously if
  stateChanger is an async function.
*/

/*ref={hiddenFileInput} associates this input with
 the hiddenFileInput reference, allowing it to be
 triggered programmatically via hiddenFileInput
 .current.click(). */