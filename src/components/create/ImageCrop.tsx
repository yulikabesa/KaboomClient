import type { ChangeEvent } from "react";
import "cropperjs";
import Overlay from "../UI/Overlay";
import classes from "./ImageCrop.module.css";

interface ImageCropProps {
  src: string;
  cropValue: number;
  setCropValue: (newValue: number) => void;
  closeOverlay: () => void;
}

const ImageCrop: React.FC<ImageCropProps> = (props) => {
  return (
    <Overlay
      title="חתוך את התמונה"
      closeOverlay={props.closeOverlay}
      button={true}
    >
      {/* <div className={classes["image-container"]}>
        <img className={classes["image"]} src={props.src} />
      </div>
      <input
        type="range"
        value={props.cropValue}
        min={0}
        max={100}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          props.setCropValue(Number(event.target.value));
        }}
      /> */}
    </Overlay>
  );
};

export default ImageCrop;
