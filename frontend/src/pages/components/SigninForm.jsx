import React, { useState } from "react";

import "./SigninForm.css";
export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }

  render() {
    return (
      <form class="Login" onSubmit={this.handleSubmit}>
        <label for="email">
          Email
        </label>
        <input type="email" name="email" value={this.state.value} onChange={this.handleChange} /><br/>
        <label for ="pwd">
          Password
        </label>
        <input type="password" name="pwd" value={this.state.value} onChange={this.handleChange} /><br/>
        <input type="submit" value="Sign in" />
      </form>
    );
  }
}
