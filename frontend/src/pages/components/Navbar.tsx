import React from "react";
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import GetUserResponse from "../../responses/GetUserResponse";
// import LogoutButton from "./LogoutButton";

const Navbar = (props: { user: GetUserResponse, setUser: (user: GetUserResponse) => void }) => {

  const logout = () => {
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
      <ul>
        <li><Link className="b0" to='/signup'>Sign up</Link></li>
        <li><Link className="b1" to='/signin'>Sign in</Link></li>
      </ul>
    )
  } else {
    menu = (
      <ul>
        {/* redirect to login page when you signout */}
        {/* <li><Link className="b1" to='/signin' onClick={logout}>Logout</Link></li> */}

        {/* redirect to home page when you sign out */}
        <li><Link className="b1" to='/' onClick={logout}>Logout</Link></li>
        
        {/* <li><LogoutButton /></li> */}
      </ul>
    )
  }

  return (
    <nav>
      <div>
        <Link className="navbar-title" to='/'>Portfolio Tracker</Link>
      </div>

      <div>
        {menu}
      </div>
    </nav>
  );
};

export default Navbar;
