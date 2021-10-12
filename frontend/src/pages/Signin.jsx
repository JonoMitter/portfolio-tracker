import React from "react";
import "./styles/Signin.scss";
import SigninForm from "./components/SigninForm";

export default class SignIn extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <section className ="signin">
        <SigninForm />
      </section>
    );
  }
}
