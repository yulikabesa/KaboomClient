import React, { useState } from "react";
import Overlay from "../UI/Overlay";
import classes from "./Settings.module.css";
import SharedWith from "./SharedWith";

export type permissionType = "בעלים" | "עריכה" | "צפייה";

const Settings: React.FC<{
  closeOverlay: () => void;
}> = (props) => {
  const TITLE_MAX = 50;
  const [title, setTitle] = useState("");
  const [permission, setPermission] = useState<permissionType>("צפייה");
  return (
    <Overlay title="הגדרות" closeOverlay={props.closeOverlay} button={true}>
      <div className={classes.container}>
        <div>
          <p className={classes.title}>כותרת</p>
          <div className={classes["input-wrapper"]}>
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
          <p className={classes.title}>תמונה</p>{" "}
          <p className={classes.brackets}>{`(אופציונלי)`}</p>
        </div>
        <div>
          <p className={classes.title}>משותפים</p>
          <SharedWith
            email="idf@dsjlos.idf"
            fullName="נגה זאבי"
            permission={permission}
            setPermission={setPermission}
          />
          <SharedWith
            email="idf@dsjlos.idf"
            fullName="נגה זאבי"
            permission={"בעלים"}
            setPermission={setPermission}
          />
        </div>
        <p className={classes.title}>תגיות</p>
      </div>
    </Overlay>
  );
};

export default Settings;
