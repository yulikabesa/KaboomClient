import classes from "./NavigationMenu.module.css";
import { Link } from "react-router-dom";
import kaboomLogo from "../../assets/kaboomLogo.svg";
import type React from "react";
import settingsIcon from "../../assets/settingsIcon.svg";
import Button from "../UI/Button";

const NavigationMenu: React.FC<{
  variant: "home" | "create";
  onSettingsClick?: () => void;
  quizName?: string;
  setQuizName?: React.Dispatch<React.SetStateAction<string>>;
  onQuizSave?: () => void;
}> = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes["right-side-items"]}>
        <Link to="/">
          <img src={kaboomLogo} className={classes.logo} />
        </Link>
        {props.variant === "create" && (
          <div className={classes["input-container"]}>
            <img
              src={settingsIcon}
              className={classes["input-icon"]}
              alt="icon"
              onClick={props.onSettingsClick}
            />
            <input
              id="quiz-name"
              type="text"
              className={classes["quiz-name-input"]}
              placeholder="שם החידון"
              value={props.quizName}
              maxLength={50}
              onChange={(e) => props.setQuizName!(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
      </div>
      <div className={classes["actions"]}>
        {props.variant === "home" ? (
          <Button variant="white" to="/join">
            לשחק
          </Button>
        ) : (
          <Button variant="white" to="/home">
            לצאת
          </Button>
        )}
        {props.variant === "home" ? (
          <Button variant="blue" to="/create">
            ליצור
          </Button>
        ) : (
          <Button variant="blue" onClick={props.onQuizSave}>
            לשמור
          </Button>
        )}
      </div>
    </header>
  );
};

export default NavigationMenu;
