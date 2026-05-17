import { useState, type ChangeEvent, type MouseEvent } from "react";
import Button from "../UI/Button";
import uploadIcon from "../../assets/uploadIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import cropIcon from "../../assets/cropIcon.svg";
import ImageCropper from "./ImageCropper";
import type { Area } from "react-easy-crop";
import classes from "./ImageInput.module.css";

interface ImageInputProps {
  imageSrc: string;
  imagePreview: string;
  croppedAreaPixels: Area | null;
  setImage: (file: string) => void;
  handleCropComplete: (areaPixels: Area | null) => void;
  handleSaveCropped: () => void;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: (crop: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
  const [imageCropDisplay, setImageCropDisplay] = useState(false);

  const uploadImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      props.setImage(imageUrl);
    }
  };

  const removeImageHandler = () => {
    if (props.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(props.imagePreview);
    }
    props.setImage("");
  };

  const toggleImageCrop = () => {
    setImageCropDisplay((prev) => !prev);
  };

  return (
    <>
      {props.imagePreview ? (
        <>
          <div className={`${classes["image-select"]} ${classes["selected"]}`}>
            <img className={classes["image"]} src={props.imagePreview} />
            <div className={classes["actions"]}>
              <button
                className={classes["round-btn"]}
                onClick={removeImageHandler}
              >
                <img src={deleteIcon} />
              </button>
              <button
                className={classes["round-btn"]}
                onClick={toggleImageCrop}
              >
                <img src={cropIcon} />
              </button>
              <button className={classes["round-btn"]}>
                {/* <img src={} /> */}
              </button>
            </div>
          </div>
          {imageCropDisplay && (
            <ImageCropper
              image={props.imageSrc}
              crop={props.crop}
              zoom={props.zoom}
              setCrop={props.setCrop}
              setZoom={props.setZoom}
              croppedAreaPixels={props.croppedAreaPixels}
              closeOverlay={toggleImageCrop}
              onCropComplete={props.handleCropComplete}
              onSaveCropped={props.handleSaveCropped}
            />
          )}
        </>
      ) : (
        <div className={classes["image-select"]}>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={uploadImageHandler}
          />
          <label htmlFor="file-upload" className={classes["wrapper"]}>
            <img className={classes["icon"]} src={uploadIcon} />
            <p className={classes["title"]}>העלאת תמונה</p>
            <p>רוצה להוסיף תמונה? גרור, העלה או בחר אחת מושלמת מהמאגר שלנו</p>
            <div className={classes["input-actions"]}>
              <Button style="white" className={classes[""]}>
                העלה
              </Button>
              <Button
                style="blue"
                className={classes[""]}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                מאגר
              </Button>
            </div>
          </label>
        </div>
      )}
    </>
  );
};

export default ImageInput;
