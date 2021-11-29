import axios from "axios";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

// import Home from "./pages/Home";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/components/Navbar";
import GetUserResponse from "./responses/GetUserResponse"

function App() {
  const [user, setUser] = useState(new GetUserResponse());

  useEffect(() => {
    (
      async () => {
        /* 
         * Expected Response Body
         * "id": "3180efe0-7186-4031-87bb-df318617b9a9",
         * "email": "joelstav@outlook.com",
         * "firstName": "Joel"
         */
        await axios({
          method: "get",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          url: "http://localhost:5000/api/User/oneuser",

        }).then(res => {
          setUser(res.data);
          console.log("[RESPONSE] " + res.data);

        }).catch(function (error) {
          console.log("No user login found");
        })
      }
    )()
  }, [user.id, user.firstName, user.email]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
      
      <Route path="/" exact component={() => <Home user={user} setUser={setUser} />} />
      <Route path="/signin" component={() => <SignIn setUser={setUser}/>} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
