import React, { SyntheticEvent, useState, useEffect } from "react";
import "../styles/Form.scss";

import { ReactComponent as VISIBLE } from "../../assets/visibility_white_24dp.svg";
import { ReactComponent as VISIBLE_OFF } from "../../assets/visibility_off_white_24dp.svg";

enum FormInputType {
  TEXT = "text",
  EMAIL = "email",
}

const FormInput = (props: { label: string, inputType: FormInputType }) => {


  //if inputtype etc
  const [inputValue, setInputValue] = useState('');

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    resetStyle();
  }

  function resetStyle() {
    // if (emailError !== null && emailError.innerHTML !== "") {
    //   emailError.innerHTML = "";
    // }
    // if (passwordError !== null && passwordError.innerHTML !== "") {
    //   passwordError.innerHTML = "";
    // }
    // if (emailInput !== null) {
    //   emailInput.classList.remove("input-error");
    // }
    // if (passwordInputContainer !== null) {
    //   passwordInputContainer.classList.remove("input-error");
    // }
  }

  return (
    <div className="input-container">
      <label htmlFor="form-input">{props.label}</label>
      <input
        className="input"
        type={props.inputType}
        name="form-input"
        onChange={e => onInputChange(e)}
        required
      />
      <p id="email-error" className="form-error"></p>
    </div>
  )
}

export default FormInput;
