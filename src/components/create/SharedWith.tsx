import profilePic from "../../assets/profilePic.svg";
import classes from "./SharedWith.module.css";
import type { permissionType } from "./Settings";
import { useState } from "react";

const SharedWith: React.FC<{
  name: string;
  email: string;
  permission: permissionType;
  setPermission: (email: string, newPermission: permissionType) => void;
}> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes["row-flex"]}>
        <img src={profilePic} />
        <div className={classes["column-flex"]}>
          <p className={classes["bigger-text"]}>{props.name}</p>
          <p className={classes["smaller-text"]}>{props.email}</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button
          className={
            props.permission !== "בעלים"
              ? classes["changable-permission"]
              : classes["permission"]
          }
          style={{ backgroundColor: open ? "#dfdfdf" : "" }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {props.permission}
        </button>
        {props.permission !== "בעלים" && (
          <div
            className={`${classes["dropdown-menu"]} ${
              open ? classes.open : ""
            }`}
          >
            <div
              className={classes["dropdown-item"]}
              onClick={() => props.setPermission(props.email, "צפייה")}
            >
              צפייה
            </div>

            <div
              className={classes["dropdown-item"]}
              onClick={() => props.setPermission(props.email, "עריכה")}
            >
              עריכה
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedWith;
