import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles/Home.scss";

const Home = () => {

  const [name, setName] = useState('');

  useEffect( () => {

    //get name from response
    /*
     * "id": "3180efe0-7186-4031-87bb-df318617b9a9",
     * "email": "joelstav@outlook.com",
     * "firstName": "Joel"
     */
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/User/oneuser",
    }).then(response => 
      console.log(response.data)
      // this.setState({ nameData: response.data})
    );
      // .then(res => setState)

    setName("NON DYNAMIC NAME");
  });

  return (
    <section className="home">
      <h1 className="home-title">Home page</h1>
      <div>{name ? "Hi " + name : "You are not logged in"}</div>
    </section>
  );
}

export default Home;
