import React from "react";
import classes from "./Tag.module.css";
import TagIcon from "../../../assets/courseIcon.svg";

const Tag: React.FC<{
  tag: string;
  deleteTag: (tagToDelete: string) => void;
}> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <img src={TagIcon} />
        <p className={classes.tag}>{props.tag}</p>
      </div>
      <p
        className={classes["delete-btn"]}
        onClick={() => props.deleteTag(props.tag)}
      >
        הסר
      </p>
    </div>
  );
};

export default Tag;
