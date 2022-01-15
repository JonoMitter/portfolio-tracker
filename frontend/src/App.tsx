import axios from "axios";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/components/Navbar";
import GetUserResponse from "./responses/GetUserResponse"

function App() {
  const [user, setUser] = useState(new GetUserResponse());

  const [loggedIn, setLoggedIn] = useState(false);

  document.title = "Portfolio Tracker";

  useEffect(() => {
    const getUserData = () => {
      /* 
       * Expected Response Body
       * "id": "3180efe0-7186-4031-87bb-df318617b9a9",
       * "email": "joelstav@outlook.com",
       * "firstName": "Joel"
       */
      axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        url: "http://localhost:5000/api/User",

      }).then(res => {
        setUser(res.data);

      }).catch((error) => {
        console.log("[App] Error requesting user data")
      })
    };

    console.log("[App] useEffect getUserData() called")
    getUserData();

  }, [loggedIn]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Route path="/" exact component={() => <Home user={user} setUser={setUser} />} />
      <Route path="/login" component={() => <Login setLoggedIn={setLoggedIn} />} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
