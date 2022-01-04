import React, { SyntheticEvent, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Form.scss";
import GetUserResponse from "../../responses/GetUserResponse";
import LoginErrorResponse from "../../responses/LoginErrorResponse";
import FORM_PASSWORD_INPUT from "./FORM_PASSWORD_INPUT";


const LoginForm = (props: { setUser: (user: GetUserResponse) => void }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginErrors, setLoginError] = useState(new LoginErrorResponse());
  const [redirect, setRedirect] = useState(false);

  let emailError = document.getElementById("email-error");
  let emailInput = document.getElementById("email-input");

  let passwordError = document.getElementById("password-error");
  let passwordInputContainer = document.getElementById("password-input-container");
  // let passwordInput = document.getElementById("password-input");

  useEffect(() => {
    displayErrors();
  }, [loginErrors]);

  function displayErrors() {
    if (loginErrors.errors.length > 0) {
      for (let i = 0; i < loginErrors.errors.length; i++) {
        if (loginErrors.errors[i].field.toLocaleLowerCase() === "email") {

          //write email error message
          if (emailError != null) {
            emailError.innerHTML = loginErrors.errors[i].message;
          }

          //style email input field
          if (emailInput != null && !emailInput.classList.contains("input-error")) {
            emailInput.classList.add("input-error");
          }
        }

        else if (loginErrors.errors[i].field.toLocaleLowerCase() === "password") {

          //write password error message
          if (passwordError != null) {
            passwordError.innerHTML = loginErrors.errors[i].message;
          }

          //style password input field
          if (passwordInputContainer != null && !passwordInputContainer.classList.contains("input-error")) {
            passwordInputContainer.classList.add("input-error");
          }
        }
      }
    }
  }

  function emailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    resetFormInput();
  }

  function resetFormInput() {
    if (emailError !== null && emailError.innerHTML !== "") {
      emailError.innerHTML = "";
    }
    // if (passwordError !== null && passwordError.innerHTML !== "") {
    //   passwordError.innerHTML = "";
    // }
    if (emailInput !== null) {
      emailInput.classList.remove("input-error");
    }
    // if (passwordInputContainer !== null) {
    //   passwordInputContainer.classList.remove("input-error");
    // }
  }

  function submitForm(e: SyntheticEvent) {
    e.preventDefault();

    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/user/login",
      data: {
        email: email,
        password: password
      }
    }).then((res) => {
      console.log(res.data)
      setRedirect(true);
      props.setUser(res.data)
    }).catch((error) => {
      if (error.response.data) {
        setLoginError(error.response.data);
      }
      else {
        console.log(`Unknown Error:\n
          ${error.response}`);
      }
    })
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <div className="form-outer">
      <h1 className="form-heading">Login</h1>
      <h2 className="form-subheading">Please login to access your Portfolio</h2>
      <br></br>
      <form onSubmit={submitForm}>
        <div className="input-container">
          <label htmlFor="email">EMAIL</label>
          <input
            id="email-input"
            className="input"
            type="email"
            name="email"
            onChange={e => emailInputChange(e)}
            required
          />
          <p id="email-error" className="form-error"></p>
        </div>

        <FORM_PASSWORD_INPUT id="input-password" label="PASSWORD" setValue={setPassword} />

        <input type="submit" value="LOGIN" className="form-button login-button" />
      </form >

      <div className="form-redirect">
        <hr className="form-divider"></hr>
        <p className="form-text">Dont have an account?</p>
        <Link className="form-link" to="/signup">
          SIGN UP NOW
        </Link>
      </div>
    </div >
  );
}

export default LoginForm;
