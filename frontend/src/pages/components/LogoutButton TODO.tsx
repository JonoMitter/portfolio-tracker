import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class LogoutButton extends Component {
  logout = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/User/logout",

    }).then(res => {
      console.log("Logged Out (JWT deleted)");

    }).catch(function (error){
      console.log("Error logging out");

    })
  }

  render() {
    return (
      <Link className="b1" to='/signin' onClick={this.logout}>
        LOGOUT
      </Link>
    );
  }
}
