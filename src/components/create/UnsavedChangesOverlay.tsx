import React from "react";
import classes from "./UnsavedChangesOverlay.module.css";
import Overlay from "../UI/Overlay";
import Button from "../UI/Button";

const UnsavedChangesOverlay: React.FC<{
  onClose: () => void;
  onSaveAndExit: () => void;
  onExitWithoutSaving: () => void;
}> = ({ onClose, onSaveAndExit, onExitWithoutSaving }) => {
  return (
    <Overlay
      cardClassName={classes.overOverlay}
      title="יש שינויים שלא נשמרו"
      elementId="overOverlay"
      closeOverlay={onClose}
    >
      <p className={classes.text}>
        השינויים שעשית בחידון עוד לא נשמרו.
        <br />
        אם תצא עכשיו הם יאבדו.
      </p>
      <div className={classes["buttons-flex"]}>
        <Button variant="red" onClick={onExitWithoutSaving}>
          צא בלי לשמור
        </Button>
          <Button variant="blue" onClick={onSaveAndExit}>
            שמור וצא
          </Button>
      </div>
    </Overlay>
  );
};

export default UnsavedChangesOverlay;
