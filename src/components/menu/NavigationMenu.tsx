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
  isQuizNameError?: boolean;
  setIsQuizNameError?: React.Dispatch<React.SetStateAction<boolean>>;
  onQuizSave?: () => void;
}> = (props) => {
  const quizNameInputClasses = `${classes["quiz-name-input"]} ${props.isQuizNameError && classes["error"]}`;
  return (
    <header className={classes.header}>
      <div className={classes["right-side-items"]}>
        {/* todo: remove link */}
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
              className={quizNameInputClasses}
              placeholder="שם החידון"
              value={props.quizName}
              maxLength={50}
              onChange={(e) => {
                if (
                  e.target.value &&
                  e.target.value.trim() !== "" &&
                  props.setIsQuizNameError
                )
                  props.setIsQuizNameError(false);
                else if (
                  e.target.value.trim() === "" &&
                  props.setIsQuizNameError
                ) {
                  props.setIsQuizNameError(true);
                }
                props.setQuizName!(e.target.value);
              }}
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
          <Button
            variant="blue"
            onClick={() => {
              if (
                (!props.quizName || props.quizName.trim() === "") &&
                props.setIsQuizNameError
              ) {
                props.setIsQuizNameError(true);
                return;
              }
              props.onQuizSave && props.onQuizSave();
            }}
          >
            לשמור
          </Button>
        )}
      </div>
    </header>
  );
};

export default NavigationMenu;
