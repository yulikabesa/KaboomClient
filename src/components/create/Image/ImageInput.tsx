import { useState, type ChangeEvent, type MouseEvent } from "react";
import Button from "../../UI/Button";
import ImageCropper from "./ImageCropper";
import getCroppedImg from "../../../utils/cropImage";
import type { Area, Point } from "react-easy-crop";
import type { questionImageType } from "../../../types/quiz";
import classes from "./ImageInput.module.css";
import MediaLibrary from "./MediaLibrary";

interface ImageInputProps {
  imageSrc: string;
  imagePreview: string;
  croppedAreaPixels: Area | null;
  crop: Point;
  zoom: number;
  setImageDetails: (updates: Partial<questionImageType>) => void;
  variant: "settings" | "question";
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
  const [imageCropDisplay, setImageCropDisplay] = useState(false);
  const [mediaLibDisplay, setMediaLibDisplay] = useState(false);

  const setImage = (src: string) => {
    props.setImageDetails({
      src,
      image: src,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
    });
  };

  const setCropArea = (croppedAreaPixels: Area | null) => {
    props.setImageDetails({ croppedAreaPixels });
  };

  const saveCroppedImage = async () => {
    if (!props.imageSrc || !props.croppedAreaPixels) return;

    const cropped = await getCroppedImg(
      props.imageSrc,
      props.croppedAreaPixels,
    );

    props.setImageDetails({
      image: cropped as string,
    });
  };

  const setCrop = (crop: Point) => {
    props.setImageDetails({ crop });
  };

  const setZoom = (zoom: number) => {
    props.setImageDetails({ zoom });
  };

  const uploadImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const removeImageHandler = () => {
    if (props.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(props.imagePreview);
    }
    setImage("");
  };

  const toggleImageCrop = () => {
    setImageCropDisplay((prev) => !prev);
  };

  const toggleMediaLibrary = () => {
    setMediaLibDisplay((prev) => !prev);
  };

  const handleLibClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMediaLibrary();
  };

  const handleUploadClick = () => {
    document.getElementById(`file-upload-${props.variant}`)?.click();
  };

  console.log(props.imagePreview);

  const isSettings = props.variant === "settings";

  return (
    <>
      {isSettings ? (
        <div
          className={`${classes["variant-layout"]} ${classes["settings-layout"]}`}
        >
          <div className={classes["side-actions"]}>
            {props.imagePreview ? (
              <>
                <button
                  className={`${classes["round-btn"]} ${classes["delete-btn"]}`}
                  onClick={removeImageHandler}
                  type="button"
                />

                <button
                  className={`${classes["round-btn"]} ${classes["crop-btn"]}`}
                  onClick={toggleImageCrop}
                  type="button"
                />
              </>
            ) : (
              <>
                <Button variant="white" onClick={handleUploadClick}>
                  העלה
                </Button>

                <Button variant="blue" onClick={handleLibClick}>
                  מאגר
                </Button>
              </>
            )}
          </div>
          <div
            className={`
          ${classes["image-select"]}
          ${classes[props.variant]}
          ${props.imagePreview ? classes["selected"] : ""}
        `}
          >
            {!props.imagePreview ? (
              <>
                <input
                  id={`file-upload-${props.variant}`}
                  type="file"
                  accept="image/*"
                  onChange={uploadImageHandler}
                />

                <label
                  htmlFor={`file-upload-${props.variant}`}
                  className={classes["file-upload-wrapper"]}
                >
                  <div className={classes["upload-icon"]} />
                </label>
              </>
            ) : (
              <>
                <div className={classes["image-wrapper"]}>
                  <img
                    className={classes["image"]}
                    src={props.imagePreview}
                    alt="Preview"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={classes["variant-layout"]}>
          <div
            className={`
          ${classes["image-select"]}
          ${classes[props.variant]}
          ${props.imagePreview ? classes["selected"] : ""}
        `}
          >
            {!props.imagePreview && (
              <>
                <input
                  id={`file-upload-${props.variant}`}
                  type="file"
                  accept="image/*"
                  onChange={uploadImageHandler}
                />

                <label
                  htmlFor={`file-upload-${props.variant}`}
                  className={classes["file-upload-wrapper"]}
                >
                  <div className={classes["upload-icon"]} />
                  <p className={classes["title"]}>העלאת תמונה</p>
                  <p className={classes["text"]}>
                    רוצה להוסיף תמונה? גרור, העלה או בחר אחת מושלמת מהמאגר שלנו
                  </p>

                  <div className={classes["input-actions"]}>
                    <Button variant="white" onClick={handleUploadClick}>
                      העלה
                    </Button>

                    <Button variant="blue" onClick={handleLibClick}>
                      מאגר
                    </Button>
                  </div>
                </label>
              </>
            )}

            {props.imagePreview && (
              <>
                <div className={classes["image-wrapper"]}>
                  <img
                    className={classes["image"]}
                    src={props.imagePreview}
                    alt="Preview"
                  />
                </div>

                <div className={classes["actions"]}>
                  <button
                    className={`${classes["round-btn"]} ${classes["delete-btn"]}`}
                    onClick={removeImageHandler}
                    type="button"
                  />

                  <button
                    className={`${classes["round-btn"]} ${classes["crop-btn"]}`}
                    onClick={toggleImageCrop}
                    type="button"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {imageCropDisplay && (
        <ImageCropper
          image={props.imageSrc}
          crop={props.crop}
          zoom={props.zoom}
          croppedAreaPixels={props.croppedAreaPixels}
          closeOverlay={toggleImageCrop}
          setCrop={setCrop}
          setZoom={setZoom}
          onCropComplete={setCropArea}
          onSaveCropped={saveCroppedImage}
        />
      )}
      {mediaLibDisplay && <MediaLibrary closeOverlay={toggleMediaLibrary} />}
    </>
  );
};

export default ImageInput;
