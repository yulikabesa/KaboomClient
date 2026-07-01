import Overlay from "../../UI/Overlay";
import classes from "./MediaLibrary.module.css";
import img from "../../../assets/defaultQuizCover.png";
import img2 from "../../../assets/questionMarksBackground.png";

const categories: string[] = [
  "הכל",
  "תמונות צבאיות",
  "איסלאם",
  "הכשרה",
  "מודיעין שדה",
  "סייבר",
  "שטח",
  "לוחמים",
  "מנהיגות",
];

interface MediaLibProps {
  closeOverlay: () => void;
}

const media: string[] = [
  img2,
  img,
  img,
  img,
  img,
  img2,
  img,
  img,
  img,
  img2,
  img,
  img,
  img,
  img,
];

const MediaLibrary: React.FC<MediaLibProps> = (props) => {
  return (
    <Overlay
      title="מאגר תמונות"
      button={true}
      closeOverlay={props.closeOverlay}
      elementId="overlay"
      className={classes["card-content"]}
    >
      <div className={classes["layout"]}>
        <div className={classes["category-list"]}>
          {categories.map((category) => (
            <button className={classes["category-btn"]}>{category}</button>
          ))}
        </div>
        <div className={classes["media-grid"]}>
          {media.map((image) => (
            <img className={classes["image"]} src={image} />
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default MediaLibrary;
