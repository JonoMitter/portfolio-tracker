import React from "react";
import "./Navbar.scss";
import {Link} from 'react-router-dom';

type Props = {
  
}

export default class Navbar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
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
