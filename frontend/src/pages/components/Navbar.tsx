import React from "react";
import "../styles/Navbar.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import GetUserResponse from "../../responses/GetUserResponse";
// import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as USER_ICON } from "../../assets/person_outline_white_36dp.svg";
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

    }).catch(error => {
      console.log("Error logging out");

    })
  }

  let menu;

  if (props.user.firstName === "") {
    menu = (
      <ul className="nav-right">
        <li><Link className="nav-item login inline scale-hover" to='/login'>LOGIN</Link></li>
        <li><Link className="nav-item signup inline scale-hover" to='/signup'>SIGN UP</Link></li>
      </ul>
    )
  } else {
    menu = (
      <ul className="nav-right">
        <li><div className="nav-item nav-user"> <USER_ICON className="white-svg" /> <span className="nav-name">{props.user.firstName}</span></div></li>
        <li><Link className="nav-item logout-button" to='/' onClick={logout}>LOGOUT</Link></li>

        {/* <li><LogoutButton /></li> */}
      </ul>
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
