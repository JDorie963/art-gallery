import Button from "../Layouts/Button";
import Input from "../Layouts/Input";
import Text from "../Layouts/Text";
import ReturnButton from "../Layouts/ReturnButton";
import Link from "../Layouts/Link";
/* useState, useEffect: React hooks used to manage state
and side effects in the component.
*/
import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import CustomLoadingButton from "../Layouts/CustumLoadingButton";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";

function Login() {
  const navigate = useNavigate();


  /*
  provedUsername, provedPassword:
  Booleans to track if the username and password
  have been successfully verified.
  */
  const [username, setUsername] = useState(""); //username: Holds the value of the input field for the username.
  const [provedUsername, setProvedUsername] = useState(false); 
  const [password, setPassword] = useState(""); //password: Holds the value of the input field for the password.
  const [provedPassword, setProvedPassword] = useState(false);
  const [gallaries, setGallaries] = useState([]);  //Stores the list of galleries fetched from the server (used to validate login credentials).
  const [pending, setPending] = useState(false); //A flag that indicates whether the login request is in progress (used to display a loading button).

  /* error: Holds any error message that
   needs to be displayed (incorrect username or password).
   */
  const [error, setError] = useState("");

  /*t: The translation function from i18next used to translate text strings.
  The "login" namespace contains the relevant keys for the login page.*/
  const { t, i18n } = useTranslation(["login"]);
  const orientation = useScreenOrientation();


  /* Fetching Galleries Data:
    fetchGallaries: This function fetches a list of galleries from the API
    http://127.0.0.1:8000/api/gallaries/). It uses fetch to make an HTTP request.
    On success: It stores the data in the gallaries state.
    On error: It sets the error message in the error state.
  */
  const fetchGallaries = () => {
    fetch("http://127.0.0.1:8000/api/gallaries/")
      .then((res) => res.json())
      .then((data) => {
        setGallaries(data);
      })
      .catch((err) => {
        setError(err.message)
      }
      )
  };


  /*
  useEffect: This hook runs once when the component
  is first mounted (because of the empty dependency array []),
  and calls fetchGallaries() to load the gallery data from the API.
  */
  useEffect(() => {
    fetchGallaries();
  }, []);

  // This function is triggered when the user submits the login form.
  const handleLogin = () => {
    setPending(true);

    for (const gallary of gallaries) { //Loops through the gallaries list to find a gallery with the matching username
      if (username == gallary.username) { //f a gallery is found: Sets provedUsername to true
        setProvedUsername(true);

        /*
        Checks if the password matches the one stored in the gallery data:
        If passwords match, it stores the gallery data in localStorage
        and redirects the user to the /dashboard page using navigate().
        If the passwords do not match, it sets the error message
        "Password is not correct!" and resets pending to false.
        */
        if (password == gallary.password) {
          setProvedPassword(true);
          localStorage.setItem("user", JSON.stringify(gallary));
          navigate("/dashboard");
          return;
          /*
            If no matching gallery is found (provedUsername remains false),
            it sets the error message
            "There is no gallery with this username!" and resets pending.          
          */
        } else {
          setPending(false);
          setError(t("Password is not correct!"));

          return;
        }
      }
    }

    if (!provedUsername) {
      setPending(false);
      setError(t("There is no gallary with this username!"));
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
          {/* he stateChanger prop is used to
          update the corresponding state variables (setUsername and setPassword). */}
          <div style={{ alignItems: "center", marginTop: "180px" }}>
            <Input text={t("username")} stateChanger={setUsername} />
            <Input
              type={"password"}
              text={t("password")}
              stateChanger={setPassword}
            />
            <div style={{ marginTop: "30px" }} />
            <Link text={t("forgot password?")} />


            {/* Error Message: If there is any error message (incorrect username or password),
            it is displayed in a Text component with red text. */}
            {error != "" && (
              <Text marginTop={"25px"} color={"red-text"} text={error} />
            )}

            {/* 
            Login Button: If the pending state is false,
            a regular Button component is shown. When clicked,
            it triggers the handleLogin function. If pending is true,
            a CustomLoadingButton is displayed to indicate that the login process is ongoing.
            */ }
            <div style={{ marginTop: "50px" }} />
            {!pending && (
              <Button text={t("login")} stateChanger={handleLogin} />
            )}
            {pending && <CustomLoadingButton />}
            <Text marginTop={"50px"} text={t("don't have an account?")} />
            <Link text={t("click here to signup")} path="/signup" />
          </div>
        </>
      )}
    </>
  );
}

export default Login;