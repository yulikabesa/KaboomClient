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
      props.setImage(URL.createObjectURL(file));
    }
  };

  const removeImageHandler = () => {
    props.setImage("");
  };

  const toggleImageCrop = () => {
    setImageCropDisplay((prev) => !prev);
  };

  // const handleCropChange = (crop: Point) => {
  //   setCrop(crop);
  // };

  // const handleZoomChange = (zoom: number) => {
  //   setZoom(zoom);
  // };

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
              <button className={classes["round-btn"]}>
                <img src={cropIcon} onClick={toggleImageCrop} />
              </button>
              <button className={classes["round-btn"]}>
                {/* <img src={} /> */}
              </button>
            </div>
          </div>
          {imageCropDisplay && (
            <ImageCropper
              image={props.imageSrc}
              croppedAreaPixels={props.croppedAreaPixels}
              closeOverlay={toggleImageCrop}
              onCropComplete={props.handleCropComplete}
              onSaveCropped={props.handleSaveCropped}
              // onCropChange={handleCropChange}
              // onZoomChange={handleZoomChange}
              // zoom={zoom}
              // crop={crop}
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
