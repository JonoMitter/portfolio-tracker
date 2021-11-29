import React from "react";
import "./styles/Signin.scss";
// import SigninForm from "./components/SigninForm";
import LoginForm from "./components/LoginForm";
import GetUserResponse from "../responses/GetUserResponse";

const SignIn = (props: { setUser: (user: GetUserResponse) => void }) => {
  return (
    <section className="signin">
      <LoginForm setUser={props.setUser} />
    </section>
  );
}

export default SignIn;