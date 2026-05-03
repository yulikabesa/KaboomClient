import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Overlay from "../UI/Overlay";
import classes from "./ImageCrop.module.css";

interface ImageCropProps {
  src: string;
  cropValue?: Crop;
  setCropValue: (value: Crop) => void;
  closeOverlay: () => void;
}

const ImageCrop: React.FC<ImageCropProps> = (props) => {
  return (
    <Overlay
      title="חתוך את התמונה"
      closeOverlay={props.closeOverlay}
      button={true}
    >
      <div className={classes["image-container"]}>
        <ReactCrop
          crop={props.cropValue}
          aspect={3 / 2}
          onChange={(c) => props.setCropValue(c)}
        >
          <img src={props.src} className={classes["image"]} />
        </ReactCrop>
      </div>
      {/* <input
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
