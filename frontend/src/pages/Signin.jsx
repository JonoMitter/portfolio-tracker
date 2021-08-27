import React from "react";
import "./styles/Signin.css";
import SigninForm from "./components/SigninForm";
export default class Signin extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <section>
        <h1 class="signin-title">Signin page</h1>
        <SigninForm />
      </section>
    );
  }
}
