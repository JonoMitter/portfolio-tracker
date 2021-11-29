import React, { SyntheticEvent, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./LoginForm.scss";
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
    <div className="login">
      <h1 className="signin-title">Login</h1>
      <form className="login" onSubmit={submitForm}>
        <div className="group">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>

        <div className="group">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>

        <p className="passforget">Forgot password?</p>
        <input type="submit" value="Login" className="signinbutton" />
      </form>

      <div className="group2">
        <p className="signinText">Dont have an account?</p>
        <Link className="signupnow" to="/signup">
          SIGN UP NOW
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
