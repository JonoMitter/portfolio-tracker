import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./styles/Form.scss";

import PASSWORD_INPUT from "./components/FormPasswordInput";
import LoginError from "../responses/UserError";
import UserErrorResponse from "../responses/UserErrorResponse";

const SignUp = () => {
  const [redirect, setRedirect] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [validFirstname, setValidFirstname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);

  //backend/server errors
  const [signupErrors, setSignupError] = useState(new UserErrorResponse());

  //frontend/client errors
  const [passwordErrors, setPasswordErrors] = useState(new LoginError());
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState(new LoginError());

  let nameElement = document.getElementById("name-error");
  let emailElement = document.getElementById("email-error");

  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordConfirmChanged, setPasswordConfirmChanged] = useState(false);

  useEffect(() => {
    validatePassword(password);
    validatePasswordConfirm(passwordConfirm);
  }, [password]);

  useEffect(() => {
    validatePasswordConfirm(passwordConfirm);
  }, [passwordConfirm]);

  function allValidInputs() {
    let valid = false;

    if (validFirstname && validEmail && validPassword && validPasswordConfirm) {
      valid = true;
    }
    else {
      valid = false;
    }
    return valid;
  }

  function validateFirstName() {
    if (nameElement) {
      if (name.length < 2) {
        setValidFirstname(false);
        nameElement.innerHTML = "Firstname must contain at least 2 characters";
      }
      else {
        setValidFirstname(true);
        nameElement.innerHTML = '';
      }
    }
  }

  function validateEmail() {
    if (emailElement) {
      if (!email.includes('@')) {
        setValidEmail(false);
        emailElement.innerHTML = "Email must contain '@'";
      }
      else {
        setValidEmail(true);
        emailElement.innerHTML = '';
      }
    }
  }

  function validatePassword(password: string) {
    if (password.length == 0) {
      setValidPassword(false);
      if (!passwordChanged) {
        setPasswordChanged(true);
      }
      else {
        addPasswordError("Password must be longer than 3 characters");
      }
    }
    else if (password.length < 3) {
      setValidPassword(false);
      addPasswordError("Password must be longer than 3 characters");
    }
    else {
      setValidPassword(true);
      removePasswordErrors();
    }
  }

  function addPasswordError(message: string) {
    let passwordError = new LoginError();
    passwordError.field = "password";
    passwordError.message = message;
    setPasswordErrors(passwordError);
  }

  function removePasswordErrors() {
    setPasswordErrors(new LoginError);
  }

  function validatePasswordConfirm(passwordConfirm: string) {
    if (passwordConfirm.length == 0) {
      setValidPasswordConfirm(false);
      if (!passwordConfirmChanged) {
        setPasswordConfirmChanged(true);
      }
      else {
        addPasswordConfirmError("Passwords do not match");
      }
    }
    else if (password !== passwordConfirm) {
      setValidPasswordConfirm(false);
      addPasswordConfirmError("Passwords do not match");
    }
    else {
      setValidPasswordConfirm(true);
      removePasswordConfirmErrors();
    }
  }

  function addPasswordConfirmError(message: string) {
    let passwordError = new LoginError();
    passwordError.field = "password-confirm";
    passwordError.message = message;
    setPasswordConfirmErrors(passwordError);
  }

  function removePasswordConfirmErrors() {
    setPasswordConfirmErrors(new LoginError);
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (allValidInputs()) {
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
      }).catch((error) => {
        if (error.response.data) {
          setSignupError(error.response.data);
          console.log(error.response.data)
        }
        else {
          console.log(`Unknown Error:\n
            ${error.response}`);
        }
      })
    } else {
      //TODO
      //add error box at top?
      console.log("please fix errors")
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

          <PASSWORD_INPUT label="PASSWORD" setValue={setPassword} errorDetails={passwordErrors} />
          <PASSWORD_INPUT label="CONFIRM PASSWORD" setValue={setPasswordConfirm} errorDetails={passwordConfirmErrors} />

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