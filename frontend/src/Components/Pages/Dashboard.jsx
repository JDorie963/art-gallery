import Image from "../Layouts/Image";
import Title from "../Layouts/Title";
import "../../assets/CSS/button.css";

import React from "react";
import Button from "../Layouts/Button";
import ReturnButton from "../Layouts/ReturnButton";

import { useTranslation } from "react-i18next";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";

function Dashboard() {
  /*gallary: This fetches the user data from the localStorage
  (where it's presumably stored as a JSON string) and
  parses it into a JavaScript object.
   The data should include properties like name, image, and other user-related info.*/
  const gallary = JSON.parse(localStorage.getItem("user"));

  //useTranslation(["dashboard"]): This hook provides access to the t function,
  // which is used to translate strings based on the current language.
  // It also gives access to the i18n instance, although it's not used here.
  const { t, i18n } = useTranslation(["dashboard"]);
  const orientation = useScreenOrientation(); 
  /*//orientation: This variable holds the current screen orientation (either "portrait" or "landscape").
  The useScreenOrientation hook monitors the device's
  orientation and returns a value like "landscape-primary",
  "landscape-secondary", "portrait-primary", or "portrait-secondary".
 */
  return (
    <>
      {orientation == "landscape-primary" ||
      orientation == "landscape-secondary" ? (
        <Landscape />
      ) : (
        <>
          {/* notHasReturn={true} prop likely disables its default behavior,
          so it doesn't navigate back (possibly because it's not needed on the dashboard). */}
          <ReturnButton notHasReturn={true} />
          <div style={{ marginTop: "50px" }} />
          <Image
            shape="round"
            width="35%"
            height="125px"
            left="32%"
            src={gallary.image}
          />

          <div style={{ marginTop: "20px" }} />
          <Title text={gallary.name} />

          <div style={{ marginTop: "100px" }} />

          <Button text={t("add new item")} path="/additem" />
          <div style={{ marginTop: "30px" }} />
          <Button text={t("edit information")} path="/editinfo" />
          <div style={{ marginTop: "30px" }} />
          <Button text={t("library")} path="/library" />
          <div style={{ marginTop: "30px" }} />
          <Button text={t("logout")} path="/login" />
          <div style={{ marginTop: "50px" }} />
        </>
      )}
    </>
  );
}

export default Dashboard;