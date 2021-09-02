import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SigninForm.scss";
export default class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  //POST method into DB for login (axios method)
  handleSubmit(event) {
    console.log("submit pressed");
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <h1 class="signin-title">Signin page</h1>
        <form class="Login" onSubmit={this.handleSubmit}>
          <div class="group">
            <input
              class="input"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            {/* <label for="name" class="label">Email</label> */}
          </div>

          <div class="group">
            <input
              class="input"
              type="password"
              name="pwd"
              placeholder="Password"
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            {/* <label for="name" class="label">Password</label> */}
          </div>
          <p class="passforget">Forgot password?</p>
          <input type="submit" value="Sign in" class="signinbutton" />
        </form>
        <div class="group2">
          <p class="signinText">Dont have an account?</p>
          <Link class="signupnow" to="/signup">
            SIGN UP NOW
          </Link>
        </div>
      </div>
    );
  }
}