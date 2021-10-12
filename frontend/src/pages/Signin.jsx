import React from "react";
import "./styles/Signin.scss";
import SigninForm from "./components/SigninForm";
export default class Signin extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <section class ="signin">
        <SigninForm />
      </section>
    );
  }
}
