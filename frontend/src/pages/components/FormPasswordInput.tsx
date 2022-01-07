import React, { useEffect, useState } from "react";
import "../styles/Form.scss";
import UserError from "../../responses/UserError";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

interface Props {
  label: string;
  forgotPassword?: boolean;
  errorDetails: UserError;
  confirmPassword?: boolean;
  //TODO
  //PASS BOTH INPUTS TO EACH???
  setValidPassword?: (valid: boolean) => void;
  setPasswordsMatch?: (valid: boolean) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm?: (value: string) => void;
}

const FormPasswordInput = (props: Props) => {

  const [password, setLocalPassword] = useState('');
  const [confirmPassword, setLocalConfirmPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // let confirmPassword;

  // if (props.confirmPassword !== undefined) {
  //   confirmPassword = props.confirmPassword;
  // }

  // const [validPassword, setValidPassword] = useState(false);
  // const [passwordsMatch, setPasswordsMatch] = useState(false);

  // remove all whitespace from label prop
  let label = props.label.toLowerCase().replace(/\s+/g, '');

  let elementsSet = false;

  let inputElement = document.getElementById(label + "-input");
  let inputContainerElement = document.getElementById(label + "-input-container");
  let errorElement = document.getElementById(label + "-error");

  let confirmInputElement = document.getElementById(label + "confirm-input");
  let confirmInputContainerElement = document.getElementById(label + "confirm-input-container");
  let confirmErrorElement = document.getElementById(label + "confirm-error");


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
    props.setPassword(e.target.value);
    setLocalPassword(e.target.value);
    removeErrors();
    if (props.setValidPassword !== undefined) {
      validatePassword(e);
    }
    if (props.setPasswordsMatch !== undefined) {
      validatePasswordConfirm(e);
    }
  }

  function onConfirmInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.setPasswordConfirm) {
      props.setPasswordConfirm(e.target.value);
      setLocalConfirmPassword(e.target.value);
      removeConfirmErrors();
      // if (props.setValidPassword !== undefined) {
      //   validatePassword(e);
      // }
      if (props.setPasswordsMatch !== undefined) {
        validatePasswordConfirm(e);
      }
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

  function togglePasswordConfirmVisible() {
    if (confirmPasswordShown === false) {
      setConfirmPasswordShown(true);
      if (confirmInputElement) {
        confirmInputElement.classList.add("regular-input");
      }
    }
    else {
      setConfirmPasswordShown(false)
      if (confirmInputElement) {
        confirmInputElement.classList.remove("regular-input");
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

  function addConfirmError(message: string) {
    addConfirmErrorMessage(message)
    addConfirmErrorStyle()
  }

  function removeConfirmErrors() {
    removeConfirmErrorMessage()
    removeConfirmErrorStyle()
  }

  function addConfirmErrorMessage(message: string) {
    if (confirmErrorElement !== null) {
      confirmErrorElement.innerHTML = message;
    }
  }

  function removeConfirmErrorMessage() {
    if (confirmErrorElement !== null) {
      confirmErrorElement.innerHTML = '';
    }
  }

  function addConfirmErrorStyle() {
    if (confirmInputContainerElement != null && !confirmInputContainerElement.classList.contains("input-error")) {
      confirmInputContainerElement.classList.add("input-error");
    }
  }

  function removeConfirmErrorStyle() {
    if (confirmInputContainerElement !== null) {
      confirmInputContainerElement.classList.remove("input-error");
    }
  }

  function validatePassword(passwordInput: React.ChangeEvent<HTMLInputElement>) {
    if (inputElement && props.setValidPassword !== undefined) {
      if (passwordInput.target.value.length < 3) {
        props.setValidPassword(false);
        addError("Password must be longer than 3 characters");
      }
      else {
        props.setValidPassword(true);
        removeErrors();
      }
    }
  }

  function validatePasswordConfirm(passwordConfirmInput: React.ChangeEvent<HTMLInputElement>) {
    if (inputElement && props.setPasswordsMatch !== undefined) {
      if (password !== passwordConfirmInput.target.value) {
        props.setPasswordsMatch(false);
        addConfirmError("Passwords do not match");
      }
      else {
        props.setPasswordsMatch(true);
        removeConfirmErrors();
      }
    }
  }

  function returnPasswordInput() {
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

  function returnPasswordConfirm() {
    return (
      <div className="input-container">
        <div>
          <label htmlFor={label + "-confirm"}>CONFIRM {props.label}</label>
          {props.forgotPassword === true ? <a href="/forgotPassword" className="password-forgot">Forgot password?</a> : ""}
        </div>
        <div id={label + "confirm-input-container"} className="password-input-container">
          <input
            id={`${label}confirm-input`}
            className="input-nofocus input-password"
            type={confirmPasswordShown ? "text" : "password"}
            name={label + "-confirm"}
            onChange={e => onConfirmInputChange(e)}
            required
          />
          <button type="button" className="btn-show-password" onClick={e => togglePasswordConfirmVisible()}>{confirmPasswordShown === false ? <VISIBLE_OFF /> : <VISIBLE />}</button>
        </div>
        <p id={`${label}confirm-error`} className="form-error"></p>
      </div>
    )
  }

  return (
    // <div className="input-container">
    //   <div>
    //     <label htmlFor={label}>{props.label}</label>
    //     {/* TODO add 'Forgot password?' functionality*/}
    //     {props.forgotPassword === true ? <a href="/forgotPassword" className="password-forgot">Forgot password?</a> : ""}
    //   </div>
    //   <div id={label + "-input-container"} className="password-input-container">
    //     <input
    //       id={`${label}-input`}
    //       className="input-nofocus input-password"
    //       type={passwordShown ? "text" : "password"}
    //       name={label}
    //       onChange={e => onInputChange(e)}
    //       required
    //     />
    //     <button type="button" className="btn-show-password" onClick={e => togglePasswordVisible()}>{passwordShown === false ? <VISIBLE_OFF /> : <VISIBLE />}</button>
    //   </div>
    //   <p id={`${label}-error`} className="form-error"></p>
    // </div>
    <div>
      {props.setPasswordConfirm ? [returnPasswordInput(), returnPasswordConfirm()] : returnPasswordInput()}
    </div>
  )
}

export default FormPasswordInput;
