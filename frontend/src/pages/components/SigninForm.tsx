import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SigninForm.scss";

type Props = {
  // handleChange: (event: React.SyntheticEvent) => void;
}

type State = {
  email: string
  password: string
  [key: string]: string;
}

export default class SigninForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    this.state = {
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: any) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    console.log("INPUT CHANGED");
    console.log(`setState( name: ${name}, value: ${value}) `);
  }

  //POST method into DB for login (axios method)
  handleSubmit(event: any) {
    event.preventDefault();

    console.log("SUBMIT PRESSED");
    console.log(`Email: ${this.state.email}, Password: ${this.state.password}`);

    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/user/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    });

    // this.setState({
    //   redirect: true
    // });

    // if(redirect){
    // return <Redirect to="/"/>
    // }
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
              value={this.state.email}
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
              value={this.state.password}
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
