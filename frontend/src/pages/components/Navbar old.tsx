import React from "react";
import "./Navbar.scss";
import {Link} from 'react-router-dom';
import GetUserResponse from "../../responses/GetUserResponse";

type State = {
  user: GetUserResponse;
}
type Props = {

}

export default class Navbar extends React.Component<Props, State> {

  render() {
    return (
      <nav>
        <Link className="navbar-title" to='/'>Portfolio tracker</Link>
        <Link className="b0" to='/signup'>Sign up</Link>
        <Link className="b1" to='/signin'>Sign in</Link>
      </nav>
    );
  }
}
