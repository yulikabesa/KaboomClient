import type React from "react";
import classes from "./ProductDisplay.module.css";
import editIcon from "../assets/editIcon.svg";
import gameIcon from "../assets/gameIcon.svg";

const ProductDisplay: React.FC<{ isLoading: boolean }> = (props) => {
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
          <div className={classes.testImg}>
            <p className={classes["question-num"]}>10 שאלות</p>
            <div className={classes.hoverOverlay}>
              <div className={`${classes["option-btn"]} ${classes['top-radius']}`}>
                <span>לשחק</span>
                <img src={gameIcon} className={classes.icon} />
              </div>
              <div className={`${classes["option-btn"]} ${classes['bottom-radius']}`}>
                <span>לערוך</span>
                <img src={editIcon} className={classes.icon} />
              </div>
            </div>
          </div>
          <div className={classes["product-title"]}>כותרת</div>
          <div className={classes["product-course"]}>קורס</div>
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
