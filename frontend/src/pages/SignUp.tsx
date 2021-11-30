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

    //TODO
    //Frontend input validation
    //compare password and confirm

    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/user/register",
      data: {
        firstName: name,
        email: email,
        password: password
        // TODO
        // include PasswordConfirm and verify passwordConfirm==password in backend
      }
    }).then((res) => {
      console.log(res.data)
      setRedirect(true);
    }).catch(() => {
      console.log("User already exists/error with server")
    })
  }

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <section>
      <div className="form-outer">
        <h1 className="form-title">Sign Up</h1>
        <form className="form" onSubmit={submit}>

          <input className="input" placeholder="First Name" required
            onChange={e => setName(e.target.value)} /><br />

          <input type="email" className="input" placeholder="Email Address" required
            onChange={e => setEmail(e.target.value)} /><br />

          <input type="password" className="input" placeholder="Password" required
            onChange={e => setPassword(e.target.value)} /><br />

          <input type="password" className="input" placeholder="Confirm Password" required
            onChange={e => setPasswordConfirm(e.target.value)} /><br />

          <button type="submit" className="form-button" placeholder="Sign in">Submit</button>
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