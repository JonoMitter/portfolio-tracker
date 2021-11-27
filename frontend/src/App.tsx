import "./App.css";
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

// import Home from "./pages/Home";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
