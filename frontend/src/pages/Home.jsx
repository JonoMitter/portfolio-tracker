import React from "react";
import Navbar from './components/Navbar';
export default class home extends React.Component {
  constructor(props) {
      super()
  }
  render() {
    return (
        <section>
            <Navbar/>
            <h1>Home page</h1>
        </section>
    )
    
  }
}
