import classes from "./NavigationMenu.module.css";
import { Link } from "react-router-dom";
import kaboomLogo from "../assets/kaboomLogo.png";
import type React from "react";
import settingsIcon from "../assets/settingsIcon.svg";

const NavigationMenu: React.FC<{ variant: "home" | "create" }> = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes['right-side-items']}>
      <Link to="/">
        <img src={kaboomLogo} className={classes.logo} />
      </Link>
      {props.variant === "create" && (
        <div className={classes["input-container"]}>
          <img src={settingsIcon} className={classes["input-icon"]} alt="icon" />
          <input
            type="text"
            className={classes["quiz-name-input"]}
            placeholder="שם החידון"
          />
        </div>
      )}
      </div>
      <nav>
        <ul>
          <li>
            {props.variant === "home" ? (
              <Link className={classes["white-btn"]} to="/join">
                לשחק
              </Link>
            ) : (
              <Link className={classes["white-btn"]} to="/home">
                לצאת
              </Link>
            )}
          </li>
          <li>
            {props.variant === "home" ? (
              <Link className={classes["blue-btn"]} to="/create">
                ליצור
              </Link>
            ) : (
              <div className={classes["blue-btn"]}>לשמור</div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationMenu;
