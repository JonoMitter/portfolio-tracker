import React, { SyntheticEvent, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Form.scss";
import GetUserResponse from "../../responses/GetUserResponse";
import LoginErrorResponse from "../../responses/LoginErrorResponse";

const LoginForm = (props: { setUser: (user: GetUserResponse) => void }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginErrors, setLoginError] = useState(new LoginErrorResponse());
  const [redirect, setRedirect] = useState(false);

  let emailError = document.getElementById("email-error");
  let passwordError = document.getElementById("password-error");

  let emailInput = document.getElementById("email-input");
  let passwordInput = document.getElementById("password-input");

  useEffect(() => {
    if (loginErrors.errors.length > 0) {
      for (let i = 0; i < loginErrors.errors.length; i++) {
        console.log(`${loginErrors.errors[i].field.toLocaleLowerCase()}-error`);
        console.log(loginErrors.errors[i].message);

        let errorField = document.getElementById(`${loginErrors.errors[i].field.toLocaleLowerCase()}-error`);
        if (errorField != null) {
          errorField.innerHTML = loginErrors.errors[i].message;
        }
        let formInput = document.getElementById(`${loginErrors.errors[i].field.toLocaleLowerCase()}-input`);
        if (formInput != null && !formInput.classList.contains("input-error")) {
          formInput.classList.add("input-error");
        }
      }
    }
  }, [loginErrors]);


  function emailInputChange(e: React.ChangeEvent<HTMLInputElement>) {

    setEmail(e.target.value);
    resetFormInput();
  }

  function passwordInputChange(e: React.ChangeEvent<HTMLInputElement>) {

    setPassword(e.target.value);
    resetFormInput();
  }

  //TODO
  //call to remove red input field border and error messages upon input update
  function resetFormInput() {
    if (emailError != null && emailError.innerHTML != "") {
      emailError.innerHTML = "";
    }
    if (passwordError != null && passwordError.innerHTML != "") {
      passwordError.innerHTML = "";
    }
    if (emailInput != null) {
      emailInput.classList.remove("input-error");
    }
    if (passwordInput != null) {
      passwordInput.classList.remove("input-error");
    }
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
      <form className="form" onSubmit={submitForm}>

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

        <div className="input-container">
          <div className="grid-two-cols">
            <label htmlFor="password">PASSWORD</label>
            {/* TODO add forgot password functionality*/}
            {/* <a className="form-forgot">Forgot password?</a> */}
          </div>
          <input
            id="password-input"
            className="input input-password"
            type="password"
            name="password"
            onChange={e => passwordInputChange(e)}
            required
          />
          <p id="password-error" className="form-error"></p>
        </div>

        <input type="submit" value="LOGIN" className="form-button login-button" />
      </form>

      <div>
        <p className="form-text">Dont have an account?</p>
        <Link className="form-link" to="/signup">
          SIGN UP NOW
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
