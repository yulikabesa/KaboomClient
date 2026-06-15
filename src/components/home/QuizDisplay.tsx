import type React from "react";
import classes from "./QuizDisplay.module.css";
import editIcon from "../../assets/editIcon.svg";
import gameIcon from "../../assets/gameIcon.svg";
import { useSocket } from "../../store/SocketContext";
import { useNavigate } from "react-router-dom";
import { useLobby } from "../../store/LobbyContext";
import { useState } from "react";
import type { quizType } from "../../types/quiz";
import defaultCover from "../../assets/defaultCoverPhoto.png";
import { useAuth } from "../../store/AuthContext";

const QuizDisplay: React.FC<{
  variant: "loading" | "quiz" | "newQuiz";
  quiz?: quizType;
}> = (props) => {
  const navigate = useNavigate();
  const { setLobby } = useLobby();
  const socket = useSocket();
  const { user } = useAuth();
  const userId = user?._id;

  const canEdit =
    props.quiz?.owner === userId ||
    props.quiz?.sharedWith?.some(
      (shared) => shared.user._id === userId && shared.permission === "עריכה",
    );

  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const onClickHandler = () => {
    if (!socket || isCreatingGame) return;

    setIsCreatingGame(true);

    // Emit event to create game
    socket.emit("game-event", {
      type: "create-game-session",
      payload: { quizId: props.quiz?._id },
    });

    // Listen for the game-created event only once
    socket.once("game-created", ({ pin }: { pin: string }) => {
      console.log("Game created with pin:", pin);
      setLobby({
        gamePin: pin,
        players: [],
        quizId: props.quiz?._id ?? "",
      });
      navigate(`/lobby/${pin}`);
    });

    // fallback
    setTimeout(() => {
      setIsCreatingGame(false);
    }, 5000);
  };

  const onEditClick = () => {
    navigate(`/create/${props.quiz?._id}`);
  };

  return (
    <div className={classes.container}>
      {props.variant === "loading" && (
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
      )}
      {props.variant === "quiz" && (
        <>
          <div
            className={classes.testImg}
            style={{
              backgroundImage: `url(${props.quiz?.coverImage === "" ? defaultCover : props.quiz?.coverImage})`,
            }}
          >
            <p className={classes["question-num"]}>
              {props.quiz?.questions?.length ?? 0} שאלות
            </p>
            <div className={classes.hoverOverlay}>
              <div
                onClick={onClickHandler}
                style={{
                  pointerEvents: isCreatingGame ? "none" : "auto",
                  opacity: isCreatingGame ? 0.6 : 1,
                  cursor: isCreatingGame ? "not-allowed" : "pointer",
                }}
                className={`${classes["option-btn"]} ${classes["blue-btn"]}`}
              >
                <span>לשחק</span>
                <img src={gameIcon} className={classes.icon} />
              </div>
              {canEdit && (
                <div
                  onClick={onEditClick}
                  className={`${classes["option-btn"]} ${classes["transparent-btn"]}`}
                >
                  <span>לערוך</span>
                  <img src={editIcon} className={classes.icon} />
                </div>
              )}
            </div>
          </div>
          <div className={classes["product-title"]}>
            {props.quiz?.title ?? ""}
          </div>
          <div className={classes["product-course"]}>
            {props.quiz?.tags.length === 1
              ? props.quiz?.tags[0]
              : props.quiz?.tags?.join(", ")}
          </div>
        </>
      )}
      {props.variant === "newQuiz" && (
        <button
          className={classes["add-quiz"]}
          onClick={() => {
            navigate("/create");
          }}
        >
          <div className={classes["add-quiz-content"]}>
            <p>נראה שלא יצרת שאלון</p>
            <div className={classes["add-quiz-icon"]} />
            <p>אולי עכשיו זה הזמן להתחיל</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default QuizDisplay;
