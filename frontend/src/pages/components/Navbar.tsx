import React from "react";
import "../styles/Navbar.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import GetUserResponse from "../../responses/GetUserResponse";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
// import LogoutButton from "./LogoutButton";

const Navbar = (props: { user: GetUserResponse, setUser: (user: GetUserResponse) => void }) => {

  function logout() {
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/User/logout",

    }).then(res => {
      props.setUser(new GetUserResponse())
      console.log("Logged Out (JWT deleted)");

    }).catch(function (error) {
      console.log("Error logging out");

    })
  }

  let menu;

  if (props.user.firstName === "") {
    menu = (
      <ul className="nav-right">
        <li><Link className="nav-item cyan inline" to='/login'>Login</Link></li>
        <li><Link className="nav-item nav-item-right pink inline" to='/signup'>Sign up</Link></li>
      </ul>
    )
  } else {
    menu = (
      <div className="nav-right">
        <ul >
          <li><div className="nav-item nav-name"> <UserIcon className="white-svg"/> {props.user.firstName}</div></li>
          <li><Link className="nav-item nav-item-right logout-button" to='/' onClick={logout}>Logout</Link></li>

          {/* <li><LogoutButton /></li> */}
        </ul>
      </div>
    )
  }

  return (
    <nav>
      <div className="nav-content">
        <Link className="navbar-title" to='/'>Portfolio Tracker</Link>
        {menu}
      </div>
    </nav>
  );
};

export default Navbar;
