import React, { useEffect, useState } from "react";
import "../styles/Form.scss";
import UserError from "../../responses/UserError";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

interface Props {
  label: string;
  forgotPassword?: boolean;
  errorDetails: UserError;
  passwordValue?: string;
  setValue: (value: string) => void;
}

const FormPasswordInput = (props: Props) => {

  const [passwordShown, setPasswordShown] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // remove all whitespace from label prop
  let label = props.label.toLowerCase().replace(/\s+/g, '');

  let elementsSet = false;

  let inputElement = document.getElementById(label + "-input");
  let inputContainerElement = document.getElementById(label + "-input-container");
  let errorElement = document.getElementById(label + "-error");

  useEffect(() => {
    setHTMLElements();
    updateErrorMessages();
  }, [props.errorDetails]);

  function setHTMLElements() {
    if (!elementsSet) {
      inputElement = document.getElementById(label + "-input");
      inputContainerElement = document.getElementById(label + "-input-container");
      errorElement = document.getElementById(label + "-error");
      elementsSet = true;
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setValue(e.target.value);
    removeErrors();
    if (props.passwordValue !== undefined) {
      validatePasswordConfirm(e);
    }
    else {
      validatePassword(e);
    }
  }

  function togglePasswordVisible() {
    if (passwordShown === false) {
      setPasswordShown(true);
      if (inputElement) {
        inputElement.classList.add("regular-input");
      }
    }
    else {
      setPasswordShown(false)
      if (inputElement) {
        inputElement.classList.remove("regular-input");
      }
    }
  }

  // checks whether to display or remove errors
  function updateErrorMessages() {
    if (props.errorDetails.message !== "") {
      displayBackendErrors();
    }
    else {
      removeErrors();
    }
  }

  function displayBackendErrors() {
    //if there is an error
    if (props.errorDetails.field !== "") {

      // display the password error message
      addErrorMessage(props.errorDetails.message);

      // style the password input field
      addErrorStyle();
    }
  }

  function addError(message: string) {
    addErrorMessage(message)
    addErrorStyle()
  }

  function removeErrors() {
    removeErrorMessage()
    removeErrorStyle()
  }

  function addErrorMessage(message: string) {
    if (errorElement !== null) {
      errorElement.innerHTML = message;
    }
  }

  function removeErrorMessage() {
    if (errorElement !== null) {
      errorElement.innerHTML = '';
    }
  }

  function addErrorStyle() {
    if (inputContainerElement != null && !inputContainerElement.classList.contains("input-error")) {
      inputContainerElement.classList.add("input-error");
    }
  }

  function removeErrorStyle() {
    if (inputContainerElement !== null) {
      inputContainerElement.classList.remove("input-error");
    }
  }

  function validatePassword(passwordInput: React.ChangeEvent<HTMLInputElement>) {
    if (inputElement) {
      if (passwordInput.target.value.length < 3) {
        setValidPassword(false);
        addError("Password must be longer than 3 characters");
      }
      else {
        setValidPassword(true);
        removeErrors();
      }
    }
  }

  function validatePasswordConfirm(passwordConfirmInput: React.ChangeEvent<HTMLInputElement>) {
    if (inputElement) {
      if (props.passwordValue !== passwordConfirmInput.target.value) {
        setPasswordsMatch(false);
        addError("Passwords do not match");
      }
      else {
        setPasswordsMatch(true);
        removeErrors();
      }
    }
  }

  return (
    <div className="input-container">
      <div>
        <label htmlFor={label}>{props.label}</label>
        {/* TODO add 'Forgot password?' functionality*/}
        {props.forgotPassword === true ? <a href="/forgotPassword" className="password-forgot">Forgot password?</a> : ""}
      </div>
      <div id={label + "-input-container"} className="password-input-container">
        <input
          id={`${label}-input`}
          className="input-nofocus input-password"
          type={passwordShown ? "text" : "password"}
          name={label}
          onChange={e => onInputChange(e)}
          required
        />
        <button type="button" className="btn-show-password" onClick={e => togglePasswordVisible()}>{passwordShown === false ? <VISIBLE_OFF /> : <VISIBLE />}</button>
      </div>
      <p id={`${label}-error`} className="form-error"></p>
    </div>
  )
}

export default FormPasswordInput;
