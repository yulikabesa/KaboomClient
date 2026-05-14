import React, { useState } from "react";
import Overlay from "../UI/Overlay";
import classes from "./Settings.module.css";

const Settings: React.FC<{
  closeOverlay: () => void;
}> = (props) => {
  const TITLE_MAX = 50;
  const DESCRIPTION_MAX = 500;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Overlay title="הגדרות" closeOverlay={props.closeOverlay} button={true}>
      <div className={classes.container}>
        <p className={classes.title}>כותרת</p>
        <div className={`${classes["input-wrapper"]} ${classes["half-width"]}`}>
          <span className={classes["counter"]}>
            {title.length}/{TITLE_MAX}
          </span>
          <input
            type="text"
            placeholder="מה שם החידון שלך?"
            maxLength={TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <p className={classes.title}>תיאור</p> <p>{`(אופצונלי)`}</p>
        <div className={classes["input-wrapper"]}>
          <span className={classes["counter"]}>
            {description.length}/{DESCRIPTION_MAX}
          </span>
          <input
            type="text"
            placeholder="תאר את החידון שלך"
            maxLength={DESCRIPTION_MAX}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes["side-to-side-box"]}>
          <p className={classes.title}>משותפים</p>
          <p className={classes.title}>תגיות</p>
        </div>
      </div>
    </Overlay>
  );
};

export default Settings;
