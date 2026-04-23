import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigate = useNavigate();

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  const sendPostRequest = async () => {
    setIsError(false);
    try {
      // Send the POST request using await
      const url = "http://localhost:3000/user/login";
      let response;
      try {
        response = await axios.post(
          url,
          {
            email: enteredEmail,
            password: enteredPassword,
          },
          {
            headers: {
              "Content-Type": "application/json", // This is the default, but explicitly shown here
            },
          },
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error("Error sending POST request:", axiosError.message);
          if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Status:", axiosError.response.status);
            console.error("Data:", axiosError.response.data);
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      }
      setIsLoading(false);
      console.log(response);
      // todo add authcontext which saves token in local storage
      localStorage.setItem("token", response.data.data.token);
      handleLogin();
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    setEnteredPassword("");
    setEnteredEmail("");
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
        {!isLoading && <button type="submit" className={classes['login-btn']}>התחבר</button>}
        {isLoading && <p>loading...</p>}
        {isError && <p>email or password is incorrect</p>}
      </div>
    </form>
  );
};

export default Login;
