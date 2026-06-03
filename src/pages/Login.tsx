import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { loginUser } from "../api/userApi";
import { useAuth } from "../store/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  const sendPostRequest = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await loginUser(enteredEmail, enteredPassword);
      console.log(data);
      setAuthToken(data.token);
      handleLogin();
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setEnteredPassword("");
      setEnteredEmail("");
    }
  };

  const submitHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    await sendPostRequest();
  };

  const handleLogin = () => {
    window.dispatchEvent(new Event("login"));
    navigate("/home", { replace: true });
  };

  return (
    <div className={classes.background}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">אימייל</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">סיסמא</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div>
          {!isLoading && (
            <button type="submit" className={classes["login-btn"]}>
              התחבר
            </button>
          )}
          {isLoading && <p>loading...</p>}
          {isError && <p>email or password is incorrect</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
