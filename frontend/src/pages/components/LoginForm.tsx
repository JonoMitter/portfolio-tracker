import React, { SyntheticEvent, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Form.scss";
import GetUserResponse from "../../responses/GetUserResponse";

const LoginForm = (props: { setUser: (user: GetUserResponse) => void }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);

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
    }).catch(() => {
      console.log("User already exists/error with server")
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
        <label htmlFor="email">EMAIL</label>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <p className="form-error email-error">Cannot find user with this email</p>

        <label htmlFor="password">PASSWORD</label>
        <input
          className="input  input-password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="grid-two-cols">
          <p className="form-error">Incorrect password</p>
          <p className="form-forgot password-error">Forgot password?</p>
        </div>

        <input type="submit" value="Login" className="form-button" />
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
