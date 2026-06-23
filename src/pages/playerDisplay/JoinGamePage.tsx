import React, { useState } from "react";
import kaboomLogo from "../../assets/KaboomLogo.svg";
import { useSocket } from "../../store/SocketContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import classes from "./JoinGamePage.module.css";
import layoutClasses from "../../components/UI/Layout.module.css";

const JoinGamePage: React.FC = () => {
  const [pin, setPin] = useState("");
  const [didSubmitPin, setDidSubmitPin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const socket = useSocket();
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const navigate = useNavigate();

  const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPin(event.target.value);
    setError("");
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setError("");
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // PIN validation
    if (!didSubmitPin) {
      if (!pin.trim()) {
        setError("הקוד לא יכול להיות ריק");
        return;
      }

      if (!/^\d{7}$/.test(pin)) {
        setError("הקוד חייב להיות בן 7 ספרות");
        return;
      }

      if (isCheckingPin) return;
      setIsCheckingPin(true);

      if (!socket) return;

      // success case
      socket.once("pin-valid", () => {
        setIsCheckingPin(false);
        setError("");
        setDidSubmitPin(true);
      });

      // error case
      socket.once("pin-error", (message: string) => {
        setIsCheckingPin(false);
        setError(message);
      });

      socket.emit("game-event", {
        type: "validate-pin",
        payload: {
          pin,
        },
      });
      return;
    }

    // nickname validation
    if (!nickname.trim()) {
      setError("יש להזין שם");
      return;
    }

    setError(""); // clear error

    // join game
    // Emit event to join gam
    socket.emit("game-event", {
      type: "join-game",
      payload: {
        pin,
        nickname,
      },
    });

    socket.once("game-state", () => {
      sessionStorage.setItem("nickname", nickname);
      navigate(`/game/${pin}`, { replace: true });
    });
  };

  return (
    <div
      className={`${classes.page} ${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
    >
      <div className={classes["main"]}>
        <img src={kaboomLogo} alt="kaboom-logo" />
        <form className={classes["form"]} onSubmit={handleSubmit}>
          {!didSubmitPin ? (
            <>
              <input
                type="text"
                value={pin}
                placeholder="הכנס קוד"
                onChange={handlePinChange}
                className={classes["pin-input"]}
              />
              <Button
                variant="black"
                type="submit"
                className={classes["join-game-button"]}
              >
                כנס
              </Button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={nickname}
                placeholder="כתוב שם"
                onChange={handleNicknameChange}
                className={classes["pin-input"]}
              />
              <Button
                variant="black"
                type="submit"
                className={classes["join-game-button"]}
              >
                אחלה, מתחברים!
              </Button>
            </>
          )}
          {error && <p className={classes["error-text"]}>{error}</p>}
        </form>
      </div>
      <footer className={classes["info"]}>
        <p className={classes["info-text"]}>
          צור את ה”קאבום” שלך בקלות דרך Kaboom.com/create
        </p>
        <p className={classes["credit-text"]}>
          זכויות שמורות לארטק מדור טכנולוגיות למידה
        </p>
      </footer>
    </div>
  );
};

export default JoinGamePage;
