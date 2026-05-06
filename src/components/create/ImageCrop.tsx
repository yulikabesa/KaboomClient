import { useState, type ChangeEvent } from "react";
import Cropper, { type Area } from "react-easy-crop";
import Overlay from "../UI/Overlay";
import classes from "./ImageCrop.module.css";
import Button from "../UI/Button";

interface ImageCropProps {
  image: string;
  croppedAreaPixels: Area | null;
  onCropComplete: (areaPixels: Area | null) => void;
  onSaveCropped: () => void;
  closeOverlay: () => void;
  // onCropChange: (crop: Point) => void;
  // onZoomChange: (zoom: number) => void;
  // zoom: number;
  // crop: Point;
}

const ImageCrop: React.FC<ImageCropProps> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleSaveCropped = () => {
    props.onSaveCropped();
    props.closeOverlay();
  };

  return (
    <Overlay
      title="חתוך את התמונה"
      closeOverlay={props.closeOverlay}
      button={true}
    >
      <div className={classes["image-container"]}>
        <Cropper
          image={props.image}
          zoomWithScroll={false}
          aspect={3 / 2}
          onCropComplete={(area, areaPixels) =>
            props.onCropComplete(areaPixels)
          }
          crop={crop}
          zoom={zoom}
          // onCropChange={(location) => props.onCropChange(location)}
          // onZoomChange={(zoom) => props.onZoomChange(zoom)}
          onCropChange={(crop) => setCrop(crop)}
          onZoomChange={(zoom) => setZoom(zoom)}
          initialCroppedAreaPixels={props.croppedAreaPixels ?? undefined}
        />
      </div>
      <div className={classes["zoom-input"]}>
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
      </div>
      <div className={classes["actions"]}>
        <Button style="white" onClick={props.closeOverlay}>
          סגור
        </Button>
        <Button style="blue" onClick={handleSaveCropped}>
          שמור
        </Button>
      </div>
    </Overlay>
  );
};

export default ImageCrop;
