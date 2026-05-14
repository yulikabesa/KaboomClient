import React, { useState } from "react";
import Overlay from "../UI/Overlay";
import classes from "./Settings.module.css";

const Settings: React.FC<{
  closeOverlay: () => void;
}> = (props) => {
  const TITLE_MAX = 50;
  const [title, setTitle] = useState("");
  return (
    <Overlay title="הגדרות" closeOverlay={props.closeOverlay} button={true}>
      <div className={classes.container}>
        <div>
          <p className={classes.title}>כותרת</p>
          <div
            className={`${classes["input-wrapper"]} ${classes["half-width"]}`}
          >
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
        </div>
        <div>
          <p className={classes.title}>תמונה</p> <p>{`(אופצונלי)`}</p>
        </div>
        <p className={classes.title}>משותפים</p>
        <p className={classes.title}>תגיות</p>
      </div>
    </Overlay>
  );
};

export default Settings;
