import React, { useEffect, useState } from "react";
import "../styles/Form.scss";
import UserError from "../../responses/UserError";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

interface Props {
  label: string;
  forgotPassword?: boolean;
  clientErrorDetails?: UserError;
  serverErrorDetails?: UserError;
  setValue: (value: string) => void;
}

const FormPasswordInput = (props: Props) => {

  const [passwordShown, setPasswordShown] = useState(false);

  // removes all whitespace from label prop
  let label = props.label.toLowerCase().replace(/\s+/g, '');

  let elementsSet = false;

  let inputElement = document.getElementById(label + "-input");
  let inputContainerElement = document.getElementById(label + "-input-container");
  let errorElement = document.getElementById(label + "-error");

  useEffect(setElementsAndErrors, [props.clientErrorDetails, props.serverErrorDetails, setElementsAndErrors]);

  function setElementsAndErrors() {
    setHTMLElements();
    updateErrorMessages();
  }

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
    if (props.clientErrorDetails !== undefined && props.clientErrorDetails.message !== "") {
      addError(props.clientErrorDetails.message);
    }
    else if (props.serverErrorDetails !== undefined) {
      removeErrors();
      if (props.serverErrorDetails.message !== "") {
        addError(props.serverErrorDetails.message);
        props.serverErrorDetails.message = "";
      }
    }
    else {
      removeErrors();
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
    if (errorElement !== null && message !== '') {
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

  function passwordInputElement() {
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
          <button type="button" className="btn-show-password" tabIndex={-1} onClick={e => togglePasswordVisible()}>{passwordShown === false ? <VISIBLE_OFF /> : <VISIBLE />}</button>
        </div>
        <p id={`${label}-error`} className="form-error"></p>
      </div>
    )
  }

  return passwordInputElement();
}

export default FormPasswordInput;
