import type React from "react";
import classes from "./ProductDisplay.module.css";

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
          </div>
          <div className={classes["product-title"]}>כותרת</div>
          <div className={classes["product-course"]}>קורס</div>
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
