import React from "react";
import LoginForm from "./components/LoginForm";
import GetUserResponse from "../responses/GetUserResponse";

const Login = (props: { setUser: (user: GetUserResponse) => void }) => {

  return (
    <section>
      <LoginForm setUser={props.setUser} />
    </section>
  );
}

export default Login;