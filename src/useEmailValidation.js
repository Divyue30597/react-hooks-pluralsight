import React, { useReducer, useState } from "react";
import useInterval from "./useInterval";

function useEmailValidation(seconds) {
  // 1. we have a validateEmail function that uses a regex expression to validate an email address.
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  };
  // 2. Then, we declare with useState a boolean that defaults our emailValid state to false. That's because we will start with an empty text string, which is not a valid email.
  const [emailValid, setEmailValid] = useState(false);

  const emailReducer = (state, action) => {
    const isValidEmail = validateEmail(action);
    setEmailValid(isValidEmail);
    return action;
  };
  // 3. Then, we create our email state. But instead of using useState, we create a simple reducer using useReducer. By replacing useState with useReducer, our first parameter to useReducer is now the reducer function named emailReducer. And the second parameter is the initial value of the associated state.
  // 4. Issue if we used useState is that we won't be able to validate the email. Since we will be just using setEmail to set email's state and further not validating it on the go. which is what we want.
  // With the help of the reducer we are using the setEmailValid and we are updating the state of the email after validating. And both the states are in sync.
  const [email, setEmail] = useReducer(emailReducer, "");

  const maxSeconds = 30;

  const [count, setCount] = useState(maxSeconds);

  useInterval(() => {
    setCount(count - 1);
  }, 1000);

  return {
    setEmail,
    count,
    email,
    emailValid,
    setCount,
  };
}

export default useEmailValidation;
