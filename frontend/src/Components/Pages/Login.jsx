import Button from "../Layouts/Button";
import Input from "../Layouts/Input";
import Text from "../Layouts/Text";
import ReturnButton from "../Layouts/ReturnButton";
import Link from "../Layouts/Link";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import CustomLoadingButton from "../Layouts/CustumLoadingButton";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [provedUsername, setProvedUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [provedPassword, setProvedPassword] = useState(false);
  const [gallaries, setGallaries] = useState("[]");  
  const [pending, setPending] = useState(false);     {/*used to indicate whether a login attempt is in progress. */}

  const [error, setError] = useState(""); {/*to display any error messages */}

  const { t, i18n } = useTranslation(["login"]);
  const orientation = useScreenOrientation();

  const fetchGallaries = () => {
    {/*calls the fetch method to get data from the specified API endpoint. */}
    {/*After the fetch request completes, this line processes the response by converting it to JSON. */}
    fetch("http://172.20.10.10:8000/api/gallaries/") 
      .then((res) => res.json())  
      .then((data) => {
        setGallaries(data);
      })
      .catch((err) => {
        setError(err.message)
      })
    };

  useEffect(() => {
      // This code runs only once when the component mounts []
      //run this effect only once, right after the component mounts".
      //v  It will not run again on re-renders.
    fetchGallaries();
  }, []); 


    // This defines the handleLogin function, which will execute when the user attempts to log iin
  const handleLogin = () => {
    setPending(true);  // Sets pending to true to indicate that a login attempt is in progress
    
    for(const gallary of gallaries) {
      if (username == gallary.username) {
        setProvedUsername(true);
        if(password == gallary.password) {
          setProvedPassword(true);
          localStorage.setItem("user", JSON.stringify(gallary)); // Saves the matched gallary object in local storage as a JSON string under the key "user"
          navigate("/dashboard");
          return;
        } else{
          setPending(false);
          setError(t("Password is not correct!"));

          return;
        }
      }
    }

    if(!setProvedUsername) {
      setPending(false);
      setError(t("There is no gallary with this username!"));
    }
  };

  return(
    <>  
      { orientation == "landscape-primary" ||
       orientation == "landscape-secondary" ? (
          <Landscape />
       ) : (
        <>
          <ReturnButton path="/" />
          <div style={{ alignItems: "center", marginTop: "180px" }}>
            <Input text={ t("username") } stateChanger={setUsername} />
            <Input
              type={"password"}
              text={t("password")}
              stateChanger={setPassword}
            />
            <div style={{ marginTop: "30px"}} />
            <Link text={t("forgot password?")} />

            {/*If there is an error, renders a text component with the error message in red*/}
            {error != "" && (
              <Text marginTop={"25px"} color={"red-text"} text={error} /> 
            )}

            <div style={{ marginTop: "50px" }}/>

            {/*Renders a login button that triggers the handleLogin function when clicked.*/}
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