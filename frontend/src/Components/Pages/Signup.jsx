import Button from "../Layouts/Button";
import Input from "../Layouts/Input";
import Text from "../Layouts/Text";
import ReturnButton from "../Layouts/ReturnButton";
import Link from "../Layouts/Link";

import React, { useState } from "react";
/* library used for making HTTP requests.
Here its is used to send data (sign-up details) to a server.
 */
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import CustomLoadingButton from "../Layouts/CustumLoadingButton";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // Holds a general error message 


  const [margin, setMargin] = useState("40px"); //Used to dynamically set the margin of the submit button based on validation feedback.

  // These hold styles (such as "red") to indicate which fields have errors.
  const [errorName, setErrorName] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [pending, setPending] = useState(false);

  /*t: This is the translation function, which allows dynamic text translation
   using the i18next library.
   it loads translation keys from the "gallaryinfo" namespace.
   */
  const { t, i18n } = useTranslation(["gallaryinfo"]);
  const orientation = useScreenOrientation();

  // handleSubmit executed when the user submits the form
  const handleSubmit = async () => {
    /*check if any of the fields (name, username, email, password)
     are empty. If they are,
     it sets an error message and adjusts the margin for the submit button. */
    if (name == "" || username == "" || email == "" || password == "") {
      setError(t("You should fill all fields!"));
      setMargin("58px");
      return;
    } else {
      const item = {
        name: name,
        username: username,
        email: email,
        password: password,
      };
      axios
        .post("http://127.0.0.1:8000/api/gallaries/", item)
        .then((response) => {
          setPending(true);
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/additionalinfo");
          /* If there's an error (invalid field values),
           checks the specific error from the response
           ( name, username, password, or email errors)
           and sets the error message and corresponding field color
           */ 
          setError("");
          setErrorName("");
          setErrorUserName("");
          setErrorPassword("");
          setErrorEmail("");
        })
        .catch((error) => {
          if (error.response.data.name) {
            setError(error.response.data.name);
            setErrorName("red");
            setErrorUserName("");
            setErrorPassword("");
            setErrorEmail("");
          } else if (error.response.data.username) {
            setError(error.response.data.username);
            setErrorUserName("red");
            setErrorName("");
            setErrorPassword("");
            setErrorEmail("");
          } else if (error.response.data.password) {
            setError(error.response.data.password);
            setErrorPassword("red");
            setErrorName("");
            setErrorUserName("");
            setErrorEmail("");
          } else if (error.response.data.email) {
            setError(error.response.data.email);
            setErrorEmail("red");
            setErrorName("");
            setErrorUserName("");
            setErrorPassword("");
          } else console.log(error);
        });
    }
  };

  return (
    <>
      {orientation == "landscape-primary" ||
      orientation == "landscape-secondary" ? (
        <Landscape />
      ) : (
        <>
          <ReturnButton path="/" />
          <div style={{ alignItems: "center", marginTop: "60px" }}>
          {/* stateChanger prop is used to update the respective
              state variables when the user types.
              The border prop applies a red border if the field has an error. */}
            <Input
              text={t("Museum / Gallary name")}
              stateChanger={setName}
              border={errorName}
            />
            <Input
              text={t("username")}
              stateChanger={setUsername}
              border={errorUserName}
            />
            <Input
              text={t("email")}
              stateChanger={setEmail}
              border={errorEmail}
            />
            <Input
              type="password"
              text={t("password")}
              stateChanger={setPassword}
              border={errorPassword}
            />

            {/* Error Message: If an error exists (error is not an empty string),
            an error message is displayed using the Text component with a red text color */}
            {error != "" && (
              <Text marginTop={"25px"} color={"red-text"} text={error} />
            )}

            <div style={{ marginTop: margin }} />

            {/* If the form is not currently submitting (pending is false),
             a Button is rendered to submit the form.
             The stateChanger prop calls handleSubmit when clicked. */}
            {!pending && (
              <Button text={t("signup")} stateChanger={handleSubmit} />
            )}

            {/* If the form is submitting (pending is true), a CustomLoadingButton
            is rendered to indicate loading. */}
            {pending && <CustomLoadingButton />}

            <Text marginTop={"40px"} text={t("Already have an account?")} />
            <Link text={t("Click here to login")} path="/login" />

            <div style={{ marginTop: "60px" }} />
          </div>
        </>
      )}
    </>
  );
}

export default Signup;