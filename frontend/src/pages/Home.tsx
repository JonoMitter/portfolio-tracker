import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles/Home.scss";

const Home = () => {

  const [name, setName] = useState('');
  
  // setName("temp name");

  useEffect( () => {

    axios.get("http://localhost:5000/api/User/oneuser");
  });

  return (
    <section className="home">
      <h1 className="home-title">Home page</h1>
      <div>{name ? "Hi " + name : "You are not logged in"}</div>
    </section>
  );
}

export default Home;
