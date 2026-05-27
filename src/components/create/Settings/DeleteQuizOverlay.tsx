import React from "react";
import classes from "./DeleteQuizOverlay.module.css";
import Overlay from "../../UI/Overlay";
import Button from "../../UI/Button";

const DeleteQuizOverlay: React.FC<{
  onClose: () => void;
  onDelete: () => void;
}> = ({ onClose, onDelete }) => {
  return (
    <Overlay
      cardClassName={classes.overOverlay}
      title="אתה בטוח?"
      elementId="overOverlay"
      closeOverlay={onClose}
    >
      <p className={classes.text}>
        אתה בטוח שבא לך למחוק את השאלון?
        <br /> אתה לא תוכל לשחזר את אותו.
      </p>
      <div className={classes["buttons-flex"]}>
        <Button variant="blue" onClick={onClose}>
          בטל
        </Button>
        <Button variant="red" onClick={onDelete}>
          מחק
        </Button>
      </div>
    </Overlay>
  );
};

export default DeleteQuizOverlay;
