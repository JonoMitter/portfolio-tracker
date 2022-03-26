import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../styles/Form.scss";

import FormPasswordInput from "./FormPasswordInput";
import UserErrorResponse from "../../responses/UserErrorResponse";
import UserError from "../../responses/UserError";

const SignUpForm = () => {
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
  const [backendErrors, setBackendErrors] = useState(new UserErrorResponse());

  //frontend/client errors
  const [passwordErrors, setPasswordErrors] = useState(new UserError());
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState(new UserError());

  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordConfirmChanged, setPasswordConfirmChanged] = useState(false);

  const validatePasswordConfirm = useCallback(() => {
    if (password !== passwordConfirm || passwordConfirm === "") {
      setValidPasswordConfirm(false);
      addPasswordConfirmError("Passwords do not match");
    }
    else {
      setValidPasswordConfirm(true);
      removePasswordConfirmErrors();
    }
  }, [password, passwordConfirm])

  useEffect(validatePassword, [password, passwordConfirm, passwordChanged, passwordConfirmChanged, validatePasswordConfirm]);

  const addError = useCallback((message: string, inputElement: HTMLElement, errorElement: HTMLElement) => {
    addErrorStyle(inputElement);
    addErrorMessage(errorElement, message);
  }, [])

  useEffect(() => {
    const displayBackendErrors = () => {

      let nameInputEl = document.getElementById("name-input");
      let nameErrorEl = document.getElementById("name-error");

      let emailInputEl = document.getElementById("email-input");
      let emailErrorEl = document.getElementById("email-error");

      for (let i = 0; i < backendErrors.errors.length; i++) {
        if (backendErrors.errors[i].field.toLowerCase() === "email" && emailInputEl && emailErrorEl) {
          setValidEmail(false);
          addError(backendErrors.errors[i].message, emailInputEl, emailErrorEl);
          backendErrors.errors[i].field = "";
          backendErrors.errors[i].message = "";
        }
        if (backendErrors.errors[i].field.toLowerCase() === "firstname" && nameInputEl && nameErrorEl) {
          setValidFirstname(false);
          addError(backendErrors.errors[i].message, nameInputEl, nameErrorEl);
          backendErrors.errors[i].field = "";
          backendErrors.errors[i].message = "";
        }
        if (backendErrors.errors[i].field.toLowerCase() === "passwordconfirm") {
          setValidPasswordConfirm(false);
          addPasswordConfirmError(backendErrors.errors[i].message);
          backendErrors.errors[i].field = "";
          backendErrors.errors[i].message = "";
        }
      }
    }
    displayBackendErrors();
  }, [backendErrors, addError]);

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

  function validateFirstName(name: string) {
    let nameInputEl = document.getElementById("name-input");
    let nameErrorEl = document.getElementById("name-error");

    if (nameInputEl && nameErrorEl) {
      if (name.length < 2) {
        setValidFirstname(false);
        addError("First Name must contain at least 2 characters", nameInputEl, nameErrorEl);
      }
      else {
        setValidFirstname(true);
        removeErrors(nameInputEl, nameErrorEl);
      }
    }
  }

  function onNameChange(name: string) {
    setName(name);
    validateFirstName(name);
  }

  function onEmailChange(email: string) {
    let emailInputEl = document.getElementById("email-input");
    let emailErrorEl = document.getElementById("email-error");
    setEmail(email);
    if (emailInputEl && emailErrorEl) {
      removeErrors(emailInputEl, emailErrorEl);
    }
  }

  function validateEmail(email: string) {
    let emailInputEl = document.getElementById("email-input");
    let emailErrorEl = document.getElementById("email-error");
    if (emailInputEl && emailErrorEl) {
      if (!email.includes('@')) {
        setValidEmail(false);
        addError("Email must contain '@'", emailInputEl, emailErrorEl);
      }
      else if (!email.includes('.com')) {
        setValidEmail(false);
        addError("Email must contain '.com'", emailInputEl, emailErrorEl);
      }
      else if (email.length < 7) {
        setValidEmail(false);
        addError("Email must contain at least 7 characters", emailInputEl, emailErrorEl);
      }
      else {
        setValidEmail(true);
        removeErrors(emailInputEl, emailErrorEl);
      }
    }
  }

  function removeErrors(inputElement: HTMLElement, errorElement: HTMLElement) {
    removeErrorStyle(inputElement);
    removeErrorMessage(errorElement);
  }

  function addErrorMessage(errorElement: HTMLElement, message: string) {
    if (errorElement !== null && message !== '') {
      errorElement.innerHTML = message;
    }
  }

  function removeErrorMessage(errorElement: HTMLElement) {
    if (errorElement !== null) {
      errorElement.innerHTML = '';
    }
  }

  function addErrorStyle(inputElement: HTMLElement) {
    if (inputElement != null && !inputElement.classList.contains("input-error")) {
      inputElement.classList.add("input-error");
    }
  }

  function removeErrorStyle(inputElement: HTMLElement) {
    if (inputElement !== null) {
      inputElement.classList.remove("input-error");
    }
  }

  function validatePassword() {
    if (password.length > 0) {
      setPasswordChanged(true);
    }
    if (password.length < 3 && passwordChanged) {
      setValidPassword(false);
      addPasswordError("Password must be longer than 3 characters");
    }
    else {
      setValidPassword(true);
      removePasswordErrors();
    }
  
    if (passwordConfirm.length > 0) {
      setPasswordConfirmChanged(true);
      validatePasswordConfirm();
    }
    else if (passwordConfirmChanged) {
      validatePasswordConfirm();
    }
  }

  function addPasswordError(message: string) {
    let passwordError = new UserError();
    passwordError.field = "password";
    passwordError.message = message;
    setPasswordErrors(passwordError);
  }

  function removePasswordErrors() {
    setPasswordErrors(new UserError());
  }

  function addPasswordConfirmError(message: string) {
    let passwordError = new UserError();
    passwordError.field = "password-confirm";
    passwordError.message = message;
    setPasswordConfirmErrors(passwordError);
  }

  function removePasswordConfirmErrors() {
    setPasswordConfirmErrors(new UserError());
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
        console.log("[SignUpForm] SignUp Successful!");
        console.log(res.data);
        setRedirect(true);
      }).catch((error) => {
        if (error.response.data) {
          setBackendErrors(error.response.data);
          console.log("[SignUpForm] Error w/ Data");
          console.log(error.response.data);
        }
        else {
          console.log("[SignUpForm] Unknown Error")
          console.log(error.response);
        }
      })
    } else {
      //TODO
      //add error box at top?
      console.log("[SignUpForm] please fix errors")
    }
  }

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <div className="form-outer">
      <h1 className="form-heading">Sign Up</h1>
      <h2 className="form-subheading">Please create an account to save your Portfolio</h2>
      <br></br>

      <form onSubmit={submit}>
        <div className="input-container">
          <label htmlFor="">First Name</label>
          <input id="name-input" className="input" name="name" required
            onChange={e => onNameChange(e.target.value)}
            onBlur={e => onNameChange(e.target.value)}
          />
          <p id="name-error" className="form-error"></p>
        </div>

        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="email" id="email-input" className="input" name="email" required
            onChange={e => onEmailChange(e.target.value)}
            onBlur={e => validateEmail(e.target.value)}
          />
          <p id="email-error" className="form-error"></p>
        </div>

        <FormPasswordInput label="Password" setValue={setPassword} clientErrorDetails={passwordErrors} />
        <FormPasswordInput label="Confirm Password" setValue={setPasswordConfirm} clientErrorDetails={passwordConfirmErrors} />

        <button type="submit" className="form-button signup-button">SIGN UP</button>
      </form>

      <div className="form-redirect">
        <hr className="form-divider"></hr>
        <p className="form-text">Already have an account?</p>
        <Link className="form-link" to="/login">LOGIN</Link>
      </div>
    </div>
  );
}

export default SignUpForm;