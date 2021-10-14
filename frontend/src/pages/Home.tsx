import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles/Home.scss";

const Home = () => {

  const [name, setName] = useState('');

  useEffect(() => {

    axios.get("http://localhost:5000/api/User/oneuser");
    //then assign data.name to name setName()
  });

  return (
    <section className="home">
      <h1 className="home-title">Home page</h1>
      <div>{name ? "Hi " + name : "You are not logged in"}</div>
    </section>
  );
}

export default Home;
