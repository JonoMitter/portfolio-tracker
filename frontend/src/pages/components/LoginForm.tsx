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
      <h1 className="form-title">Login</h1>
      <form className="form" onSubmit={submitForm}>
        
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>

        <p className="form-forgot">Forgot password?</p>
        <input type="submit" value="Login" className="form-button" />
      </form>

      <div className="group2">
        <p className="form-text">Dont have an account?</p>
        <Link className="form-link" to="/signup">
          SIGN UP NOW
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
