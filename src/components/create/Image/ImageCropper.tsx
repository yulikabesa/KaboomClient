import { useState, type ChangeEvent } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import Overlay from "../../UI/Overlay";
import classes from "./ImageCropper.module.css";
import Button from "../../UI/Button";

const minZoom = 0.4;

interface ImageCropProps {
  image: string;
  croppedAreaPixels: Area | null;
  closeOverlay: () => void;
  onCropComplete: (areaPixels: Area | null) => void;
  onSaveCropped: () => void;
  setCrop: (crop: Point) => void;
  setZoom: (zoom: number) => void;
  crop: Point;
  zoom: number;
}

const ImageCrop: React.FC<ImageCropProps> = (props) => {
  const handleSaveCropped = () => {
    props.onSaveCropped();
    props.closeOverlay();
  };

  return (
    <Overlay
      elementId="overlay"
      title="חתוך את התמונה"
      closeOverlay={props.closeOverlay}
      button={true}
      className={classes["align-content"]}
      cardClassName={classes["card"]}
    >
      <div className={classes["image-container"]}>
        <Cropper
          restrictPosition={false}
          minZoom={minZoom}
          image={props.image}
          aspect={3 / 2}
          onCropComplete={(area, areaPixels) =>
            props.onCropComplete(areaPixels)
          }
          crop={props.crop}
          zoom={props.zoom}
          onCropChange={props.setCrop}
          onZoomChange={props.setZoom}
          objectFit="cover"
        />
      </div>
      <div className={classes["zoom-input"]}>
        <div className={`${classes["zoom-icon"]} ${classes["large"]}`} />
        <input
          type="range"
          value={props.zoom}
          step={0.1}
          min={minZoom}
          max={3}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setZoom(Number(event.target.value));
          }}
        />
        <div className={`${classes["zoom-icon"]} ${classes["small"]}`} />
      </div>
      <div className={classes["actions"]}>
        <Button variant="white" onClick={props.closeOverlay}>
          סגור
        </Button>
        <Button variant="blue" onClick={handleSaveCropped}>
          שמור
        </Button>
      </div>
    </Overlay>
  );
};

export default ImageCrop;
