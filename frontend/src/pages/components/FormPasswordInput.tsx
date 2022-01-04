import React, { useEffect, useState } from "react";
import "../styles/Form.scss";
import LoginError from "../../responses/LoginError";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

const FormPasswordInput = (props: { label: string, passwordErrorDetails: LoginError, setValue: (value: string) => void }) => {

  const [passwordShown, setPasswordShown] = useState(false);

  //remove all spaces from label
  let label = props.label.toLowerCase().replace(/\s+/g, '');

  let inputElement = document.getElementById(label + "-input");
  let inputContainerElement = document.getElementById(label + "-input-container");
  let errorElement = document.getElementById(label + "-error");

  useEffect(() => {
    updateErrorMessages();
  }, [props.passwordErrorDetails]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setValue(e.target.value);
    removeErrors();
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
    if (props.passwordErrorDetails.message !== "") {
      displayErrors();
    }
    else {
      removeErrors();
    }
  }

  function displayErrors() {
    //if there is an error
    if (props.passwordErrorDetails.field !== "") {

      // display the password error message
      if (errorElement !== null) {
        errorElement.innerHTML = props.passwordErrorDetails.message;
      }

      // style the password input field
      if (inputContainerElement != null && !inputContainerElement.classList.contains("input-error")) {
        inputContainerElement.classList.add("input-error");
      }
    }
  }

  function removeErrors() {
    // check whether there is an error message being displayed
    if (errorElement !== null && errorElement.innerHTML !== "") {
      errorElement.innerHTML = "";
    }
    // check whether the password input is being styled as an error
    if (inputContainerElement !== null) {
      inputContainerElement.classList.remove("input-error");
    }
  }

  return (
    <div className="input-container">
      <div className="grid-two-cols">
        <label htmlFor={label}>{props.label}</label>
        {/* TODO add 'Forgot password?' functionality*/}
        {/* <a className="password-forgot">Forgot password?</a> */}
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
        <button type="button" className="btn-show-password" onClick={e => togglePasswordVisible()}>{passwordShown === false ? <VISIBLE /> : <VISIBLE_OFF />}</button>
      </div>
      <p id={`${label}-error`} className="form-error"></p>
    </div>
  )
}

export default FormPasswordInput;
