import { useState, type ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import Overlay from "../UI/Overlay";
import classes from "./ImageCrop.module.css";
import Button from "../UI/Button";

export interface AreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropProps {
  image: string;
  onCropComplete: (areaPixels: AreaPixels | null) => void;
  onSaveCropped: () => void;
  closeOverlay: () => void;
}

const ImageCrop: React.FC<ImageCropProps> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleSaveCropped = () => {
    props.onSaveCropped();
    props.closeOverlay();
  }

  return (
    <Overlay
      title="חתוך את התמונה"
      closeOverlay={props.closeOverlay}
      button={true}
    >
      <div className={classes["image-container"]}>
        <Cropper
          // classes={{ cropAreaClassName: classes["crop-area"] }}
          image={props.image}
          zoomWithScroll={false}
          aspect={3 / 2}
          onCropComplete={(area, areaPixels) => props.onCropComplete(areaPixels)}
          crop={crop}
          zoom={zoom}
          onCropChange={(crop) => {
            setCrop(crop);
          }}
          onZoomChange={(zoom) => {
            setZoom(zoom);
          }}
        />
      </div>
      <input
        type="range"
        value={zoom}
        step={0.1}
        min={1}
        max={10}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setZoom(Number(event.target.value));
        }}
      />
      <Button style="white" onClick={props.closeOverlay}>סגור</Button>
      <Button style="blue" onClick={handleSaveCropped}>
        שמור
      </Button>
    </Overlay>
  );
};

export default ImageCrop;
