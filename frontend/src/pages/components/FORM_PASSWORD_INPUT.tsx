import React, { useState } from "react";
import "../styles/Form.scss";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

const FORM_PASSWORD_INPUT = (props: { id: string, label: string, setValue: (value: string) => void}) => {

  const [passwordShown, setPasswordShown] = useState(false);

  let passwordInput = document.getElementById(props.id);
  let passwordInputContainer = document.getElementById("password-input-container");
  let passwordError = document.getElementById("password-error");

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setValue(e.target.value);
    resetStyle();
  }

  function togglePasswordVisible() {
    if (passwordShown === false) {
      setPasswordShown(true);
      if (passwordInput) {
        passwordInput.classList.add("regular-input");
      }
    }
    else {
      setPasswordShown(false)
      if (passwordInput) {
        passwordInput.classList.remove("regular-input");
      }
    }
  }

  function resetStyle() {
    if (passwordError !== null && passwordError.innerHTML !== "") {
      passwordError.innerHTML = "";
    }
    if (passwordInputContainer !== null) {
      passwordInputContainer.classList.remove("input-error");
    }
  }

  return (
    <div className="input-container">
      <div className="grid-two-cols">
        <label htmlFor="password">{props.label}</label>
        {/* TODO add forgot password functionality*/}
        {/* <a className="form-forgot">Forgot password?</a> */}
      </div>
      <div id="password-input-container" className="password-input-container">
        <input
          id={props.id}
          className="input-nofocus input-password"
          type={passwordShown ? "text" : "password"}
          name="password"
          onChange={e => onInputChange(e)}
          required
        />
        <button type="button" className="btn-show-password" onClick={e => togglePasswordVisible()}>{passwordShown === false ? <VISIBLE /> : <VISIBLE_OFF />}</button>
      </div>
      <p id="password-error" className="form-error"></p>
    </div>
  )
}

export default FORM_PASSWORD_INPUT;
