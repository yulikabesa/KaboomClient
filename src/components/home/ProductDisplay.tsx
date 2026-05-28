import type React from "react";
import classes from "./ProductDisplay.module.css";
import editIcon from "../../assets/editIcon.svg";
import gameIcon from "../../assets/gameIcon.svg";
import { useSocket } from "../../store/SocketContext";
import { useNavigate } from "react-router-dom";
import { useLobby } from "../../store/LobbyContext";
import { useState } from "react";
import type { productType } from "../../types/quiz";
import defaultCover from "../../assets/defaultCoverPhoto.png";

const ProductDisplay: React.FC<{
  isLoading: boolean;
  product: productType;
}> = (props) => {
  const navigate = useNavigate();
  const { setLobby } = useLobby();
  const socket = useSocket();

  const [isCreating, setIsCreating] = useState(false);

  const onClickHandler = () => {
    if (!socket || isCreating) return;

    setIsCreating(true);

    // Emit event to create game
    socket.emit("game-event", {
      type: "create-game-session",
      payload: { quizId: props.product._id },
    });

    // Listen for the game-created event only once
    socket.once("game-created", ({ pin }: { pin: string }) => {
      console.log("Game created with pin:", pin);
      setLobby({
        gamePin: pin,
        players: [],
        quizId: props.product._id,
      });
      navigate("/lobby");
    });

    // fallback
    setTimeout(() => {
      setIsCreating(false);
    }, 5000);
  };

  const onEditClick = () => {
    navigate("/create", { state: props.product });
  };
  return (
    <div className={classes.container}>
      {props.isLoading ? (
        <>
          <div className={classes.img}>
            <p
              className={`${classes["question-num-loading"]} ${classes["skeleton"]}`}
            />
          </div>
          <div
            className={`${classes["product-title-loading"]} ${classes["skeleton"]}`}
          />
          <div
            className={`${classes["product-course-loading"]} ${classes["skeleton"]}`}
          />
        </>
      ) : (
        <>
          <div
            className={classes.testImg}
            style={{
              backgroundImage: `url(${props.product.coverImage === "" ? defaultCover : props.product.coverImage})`,
            }}
          >
            <p className={classes["question-num"]}>
              {props.product.questions?.length ?? 0} שאלות
            </p>
            <div className={classes.hoverOverlay}>
              <div
                onClick={onClickHandler}
                style={{
                  pointerEvents: isCreating ? "none" : "auto",
                  opacity: isCreating ? 0.6 : 1,
                  cursor: isCreating ? "not-allowed" : "pointer",
                }}
                className={`${classes["option-btn"]} ${classes["blue-btn"]}`}
              >
                <span>לשחק</span>
                <img src={gameIcon} className={classes.icon} />
              </div>
              <div
                onClick={onEditClick}
                className={`${classes["option-btn"]} ${classes["transparent-btn"]}`}
              >
                <span>לערוך</span>
                <img src={editIcon} className={classes.icon} />
              </div>
            </div>
          </div>
          <div className={classes["product-title"]}>
            {props.product.title ?? ""}
          </div>
          <div className={classes["product-course"]}>
            {props.product.tags.length === 1
              ? props.product.tags[0]
              : props.product.tags.join(", ")}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
