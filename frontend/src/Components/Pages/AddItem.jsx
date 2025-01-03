import Button from "../Layouts/Button";
import Input from "../Layouts/Input";
import ReturnButton from "../Layouts/ReturnButton";
import Link from "../Layouts/Link";

import React, { useState, useEffect } from "react";
import AddFileButton from "../Layouts/AddFileButton";
import TextArea from "../Layouts/TextArea";
import AddImageButton from "../Layouts/AddImageButton";
import { useNavigate } from "react-router-dom";
import Text from "../Layouts/Text";
import Image from "../Layouts/Image";
import RemoveButton from "../Layouts/RemoveButton";
import PlayAudioButton from "../Layouts/PlayAudioButton";

import { useTranslation } from "react-i18next";
import VideoArea from "../Layouts/VideoArea";
import CustomLoadingButton from "../Layouts/CustumLoadingButton";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";

function AddItem() {
  const gallary = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [shownImage, setShownImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState(null);
  const [audioName, setAudioName] = useState("");
  const [augmentedVideoOrImage, setAugmentedVideoOrImage] = useState("");
  const [extraVideo, setExtraVideo] = useState(null);
  const [shownVideo, setShownVideo] = useState("");
  const [pending, setPending] = useState(false);
  const [isImageBig, setIsImageBig] = useState(false);

  const [error, setError] = useState("");

  const [margin, setMargin] = useState("100px");

  const { t, i18n } = useTranslation(["additem"]);
  const orientation = useScreenOrientation();

  const fetchItems = () => {
    fetch("http://127.0.0.1:8000/api/items/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (title == "") {
      setError(t("You should fill title!"));
      // setMargin("58px");
      return;
    } else if (image == null) {
      setError(t("You should choose a target image!"));
      // setMargin("58px");
      return;
    } else {
      setPending(true);
      setError("");
      fetchItems();

      const data = new FormData();

      const new_image = new File([image], items.length + ".jpg");

      data.append("gallary_id", gallary.id);
      data.append("target_image", new_image);
      data.append("target_index", items.length);
      data.append("title", title);
      data.append("description", description);
      if (audio != null)
        data.append("audio", audio);
      else 
        data.append("audio", "")
      data.append("audio_name", audioName)
      data.append("augmented_video", augmentedVideoOrImage);
      if (extraVideo != null) {
        data.append("extra_video", extraVideo);
      } else {
        data.append("extra_video", "");
      }

      fetch("http://127.0.0.1:8000/api/items/", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("stop", false)
          window.location.replace(
            `http://localhost:5173/dashboard`
            //`http://172.20.10.10:5502/scan-compile/compile/index.html`
          );
          //navigate("/dashboard");
        })
        .catch((err) => console.error(err));
    }
  };

  const imageChange = (obj) => {
    if (obj != null && obj.size / 1024 > 2000) {
      setIsImageBig(true);
      return;
    }
    setIsImageBig(false);
    setImage(obj);
    if (obj != null) setShownImage(URL.createObjectURL(obj));
  };

  const videoChange = (obj) => {
    setExtraVideo(obj);
    if (obj != null) setShownVideo(URL.createObjectURL(obj));
  };

  const audioChange = (obj) => {
    setAudio(obj);
    setAudioName("");
    if (obj != null) setAudioName(obj.name)
  }

  return (
    <>
      {orientation == "landscape-primary" ||
      orientation == "landscape-secondary" ? (
        <Landscape />
      ) : (
        <>
          <ReturnButton />
          <div style={{ alignItems: "center", marginTop: "3%" }}>
            {image == null ? (
              <>
                <AddImageButton
                  width="70%"
                  marginLeft="15%"
                  text={t("add target image")}
                  stateChanger={imageChange}
                />
                {isImageBig ? (
                  <Link
                    text={t("Your image size must be less than 400KBs")}
                    color={"red"}
                  />
                ) : (
                  <Link text={t("Your image size must be less than 400KBs")} />
                )}
              </>
            ) : (
              <>
                <Image width="65%" left="16%" src={shownImage} />
                <RemoveButton stateChanger={imageChange} />
              </>
            )}

            <div style={{ marginTop: "3%" }}></div>

            <Input text={t("Title")} stateChanger={setTitle} />

            <div style={{ marginTop: "3%" }}></div>

            {audio == null ? (
              <AddFileButton text={t("add main audio")} stateChanger={audioChange} />
            ) : (
              <>
                <div style={{ marginTop: "3%" }}></div>
                <PlayAudioButton src={URL.createObjectURL(audio)} name={audioName} />
                <RemoveButton stateChanger={audioChange} />
              </>
            )}  
            

            <div style={{ marginTop: "1%" }}></div>

            <AddFileButton
              text={t("add augmented image or video")}
              // class={"disabled"}
              stateChanger={setAugmentedVideoOrImage}
            />

            <div style={{ marginTop: "3%" }}></div>

            <TextArea text={t("Description")} stateChanger={setDescription} />

            <div style={{ marginTop: "1%" }}></div>

            {extraVideo == null ? (
              <AddFileButton
                text={t("add extra video")}
                stateChanger={videoChange}
              />
            ) : (
              <>
                <div style={{ marginTop: "3%" }}></div>
                <VideoArea width="65%" left="16%" src={shownVideo} />
                <RemoveButton stateChanger={videoChange} />
              </>
            )}

            <div style={{ marginTop: "5%" }}></div>

            {error != "" && (
              <Text marginTop={"25px"} color={"red-text"} text={error} />
            )}
            <div style={{ marginTop: "10%" }}></div>

            {!pending && (
              <Button text={t("Done")} stateChanger={handleAddItem} />
            )}
            {pending && <CustomLoadingButton text={true} />}

            <div style={{ marginTop: "5%" }}></div>
          </div>
        </>
      )}
    </>
  );
}

export default AddItem;