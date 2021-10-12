import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SigninForm.scss";
export default class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //POST method into DB for login (axios method)
  handleSubmit(event) {
    console.log("submit pressed");

    console.log("Email: " + this.state.email + ", Password: " + this.state.password);

    //encrypt password

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log("User Object: { email: '" + user.email + "', password: '" + user.password + "'");
    // axios.post('https://localhost:5001/api/User/login',
    //   {
    //     email: user.email,
    //     password: user.password
    //   })

    axios({
      method: "post",
      headers: {"content-type": "application/json"},
      url: "https://localhost:5001/api/User/login",
      withCredentials: true,
      data: {
        email: user.email,
        password: user.password
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <h1 className="signin-title">Signin page</h1>
        <form className="Login" onSubmit={this.handleSubmit}>
          <div className="group">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              // value={this.state.value}
              onChange={this.handleChange}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            {/* <label for="name" class="label">Email</label> */}
          </div>

          <div className="group">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              // value={this.state.value}
              onChange={this.handleChange}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            {/* <label for="name" class="label">Password</label> */}
          </div>
          <p className="passforget">Forgot password?</p>
          <input type="submit" value="Sign in" className="signinbutton" />
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
}
