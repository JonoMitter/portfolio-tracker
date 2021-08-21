import React from "react";
import "./Navbar.css";
import {Link} from 'react-router-dom';
export default class Navbar extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <nav>
        Portfolio tracker
        <Link class ="b" to= '/signup'>Sign up</Link>
        <Link class ="b" to= '/login'>Login</Link>
      </nav>
    );
  }
}
