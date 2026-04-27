import type React from "react";
import classes from "./ProductDisplay.module.css";
import editIcon from "../assets/editIcon.svg";
import gameIcon from "../assets/gameIcon.svg";

const ProductDisplay: React.FC<{ isLoading: boolean; coverImage: string; title: string; course: string; questionsNum: number; }> = (props) => {
  return (
    <div className={classes.container}>
      {props.isLoading ? (
        <>
          <div className={classes.img}>
            <p
              className={`${classes["question-num-loading"]} ${classes["skeleton"]}`}
            />
          </div>
          <div
            className={`${classes["product-title-loading"]} ${classes["skeleton"]}`}
          />
          <div
            className={`${classes["product-course-loading"]} ${classes["skeleton"]}`}
          />
        </>
      ) : (
        <>
          <div
            className={classes.testImg}
            style={{ backgroundImage: `url(${props.coverImage})` }}
          >
            <p className={classes["question-num"]}>{props.questionsNum} שאלות</p>
            <div className={classes.hoverOverlay}>
              <div
                className={`${classes["option-btn"]} ${classes["blue-btn"]}`}
              >
                <span>לשחק</span>
                <img src={gameIcon} className={classes.icon} />
              </div>
              <div className={`${classes["option-btn"]} `}>
                <span>לערוך</span>
                <img src={editIcon} className={classes.icon} />
              </div>
            </div>
          </div>
          <div className={classes["product-title"]}>{props.title}</div>
          <div className={classes["product-course"]}>{props.course}</div>
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
