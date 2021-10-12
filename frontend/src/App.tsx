import "./App.css";
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./pages/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </BrowserRouter>
  );
}

export default App;
