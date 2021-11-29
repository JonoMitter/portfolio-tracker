import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    //TODO
    //Frontend input validation
    //compare password and confirm

    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/user/register",
      data: {
        firstName: name,
        email: email,
        password: password
        // TODO
        // include PasswordConfirm and verify passwordConfirm==password in backend
      }
    }).then((res) => {
      console.log(res.data)
      setRedirect(true);
    }).catch(() => {
      console.log("User already exists/error with server")
    })
  }

  if (redirect) {
    return <Redirect to="/signin" />
  }

  return (
    <form onSubmit={submit}>
      <h1>Please Register</h1>

      <input className="" placeholder="First Name" required
        onChange={e => setName(e.target.value)} /><br/>

      <input type="email" className="" placeholder="Email Address" required
        onChange={e => setEmail(e.target.value)} /><br/>

      <input type="password" className="" placeholder="Password" required
        onChange={e => setPassword(e.target.value)} /><br/>

      <input type="password" className="" placeholder="Confirm Password" required
        onChange={e => setPasswordConfirm(e.target.value)} /><br/>

      <button type="submit" className="" placeholder="Sign in">Submit</button>
    </form>
  );
}

export default SignUp;