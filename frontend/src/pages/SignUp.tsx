import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./styles/Form.scss";

import PASSWORD_INPUT from "./components/FormPasswordInput";
import LoginError from "../responses/LoginError";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordErrorDetails, setPasswordErrorDetails] = useState(new LoginError());
  const [passwordConfirmErrorDetails, setPasswordConfirmErrorDetails] = useState(new LoginError());

  const [redirect, setRedirect] = useState(false);

  let nameElement = document.getElementById("name-error");
  let emailElement = document.getElementById("email-error");
  let passwordElement = document.getElementById("password-error");
  let passwordConfirmElement = document.getElementById("passwordConfirm-error");

  function validateFirstName() {
    if (nameElement) {
      if (name.length < 2) {
        nameElement.innerHTML = "Firstname must contain at least 2 characters";
      }
      else {
        nameElement.innerHTML = '';
      }
    }
  }

  function validateEmail() {
    if (emailElement) {
      if (!email.includes('@')) {
        emailElement.innerHTML = "Email must contain '@'";
      }
      else {
        emailElement.innerHTML = '';
      }

    }
  }

  function validatePassword() {
    if (passwordElement) {
      if (password.length < 3) {
        passwordElement.innerHTML = "Password must be longer than 3 characters";
      }
      else {
        passwordElement.innerHTML = '';
      }
    }
  }

  function validatePasswordConfirm() {
    if (passwordConfirmElement) {
      if (password !== passwordConfirm) {
        passwordConfirmElement.innerHTML = "Passwords do not match";
      }
      else {
        passwordConfirmElement.innerHTML = '';
      }
    }
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:5000/api/user/register",
        data: {
          firstName: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm
        }
      }).then((res) => {
        console.log(res.data)
        setRedirect(true);
      }).catch(() => {
        console.log("User already exists/error with server")
      })
    } else {
      //TODO alert that password and passwork confirm do not match
      console.log("passwords do not match")
    }
  }

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <section>
      <div className="form-outer">
        <h1 className="form-heading">Sign Up</h1>
        <h2 className="form-subheading">Please create an account to save your Portfolio</h2>
        <br></br>

        <form onSubmit={submit}>
          <div className="input-container">
            <label htmlFor="">FIRSTNAME</label>
            <input className="input" name="name" required
              onChange={e => setName(e.target.value)}
              onBlur={e => validateFirstName()}
            />
            <p id="name-error" className="form-error"></p>
          </div>

          <div className="input-container">
            <label htmlFor="email">EMAIL</label>
            <input type="email" className="input" name="email" required
              onChange={e => setEmail(e.target.value)}
              onBlur={e => validateEmail()}
            />
            <p id="email-error" className="form-error"></p>
          </div>

          <PASSWORD_INPUT label="PASSWORD" setValue={setPassword} errorDetails={passwordErrorDetails} />
          <PASSWORD_INPUT label="CONFIRM PASSWORD" setValue={setPasswordConfirm} errorDetails={passwordConfirmErrorDetails} />

          <button type="submit" className="form-button signup-button">SIGN UP</button>
        </form>

        <div className="form-redirect">
          <hr className="form-divider"></hr>
          <p className="form-text">Already have an account?</p>
          <Link className="form-link" to="/login">LOGIN</Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;