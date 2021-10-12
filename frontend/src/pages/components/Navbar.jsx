import React from "react";
import "./Navbar.scss";
import {Link} from 'react-router-dom';
export default class Navbar extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <nav>
        <Link class="navbar-title" to='/'>Portfolio tracker</Link>
        <Link class ="b0" to= '/signup'>Sign up</Link>
        <Link class ="b1" to= '/signin'>Sign in</Link>
      </nav>
    );
  }
}
