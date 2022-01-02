import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./styles/Form.scss";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [redirect, setRedirect] = useState(false);

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
        <br></br>

        <form className="form" onSubmit={submit}>
          <div className="input-container">
            <label htmlFor="">FIRSTNAME</label>
            <input className="input" name="name" required
              onChange={e => setName(e.target.value)} />
            <p className="form-error"></p>
          </div>

          <div className="input-container">
            <label htmlFor="email">EMAIL</label>
            <input type="email" className="input" name="email" required
              onChange={e => setEmail(e.target.value)} />
            <p className="form-error"></p>
          </div>

          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" className="input input-password" name="password" required
              onChange={e => setPassword(e.target.value)} />
            <p className="form-error"></p>
          </div>

          <div className="input-container">
            <label htmlFor="passwordConfirm">CONFIRM PASSWORD</label>
            <input type="password" className="input input-password" name="passwordConfirm" required
              onChange={e => setPasswordConfirm(e.target.value)} />
            <p className="form-error"></p>
          </div>

          <button type="submit" className="form-button">SIGN UP</button>
        </form>

        <p className="form-text">Already have an account?</p>
        <Link className="form-link" to="/login">
          LOGIN
        </Link>
      </div>
    </section>
  );
}

export default SignUp;