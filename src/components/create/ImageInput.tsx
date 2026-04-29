import uploadIcon from "../../assets/uploadIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";

import { type ChangeEvent } from "react";
import classes from "./ImageInput.module.css";

interface ImageInputProps {
  value: string;
  onChange: (file: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
  const uploadImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        // event.target.value = "";
        // setError({
        //   message: "Please select an image file.",
        // });
        return;
      }
      props.onChange(URL.createObjectURL(file));
    }
  };

  const removeImageHandler = () => {
    props.onChange("");
  };

  return (
    <>
      {props.value ? (
        <div className={`${classes["image-select"]} ${classes["selected"]}`}>
          <img className={classes["image"]} src={props.value} />
          <span className={classes["actions"]}>
            <button className={classes["round-btn"]} onClick={removeImageHandler}>
              <img src={deleteIcon} />
            </button>
            <button className={classes["round-btn"]}>
              {/* <img src={deleteIcon} /> */}
            </button>
            <button className={classes["round-btn"]}>
              {/* <img src={deleteIcon} /> */}
            </button>
          </span>
        </div>
      ) : (
        <div className={classes["image-select"]}>
          <div className={classes["wrapper"]}>
            <img className={classes["icon"]} src={uploadIcon} />
            <p className={classes["title"]}>העלת תמונה</p>
            <p>רוצה להוסיף תמונה? גרור, העלה או בחר אחת מושלמת מהמאגר שלנו</p>
          </div>
          <input type="file" accept="image/*" onChange={uploadImageHandler} />
        </div>
      )}
    </>
  );
};

export default ImageInput;
