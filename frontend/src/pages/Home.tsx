import axios from "axios";
import React, { Component } from "react";
import "./styles/Home.scss";
import GetUserResponse from "../responses/GetUserResponse"
import LogoutButton from "./components/LogoutButton"

type State = {
  user: GetUserResponse;
}
type Props = {

}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {user: new GetUserResponse('','','')};
  }

  componentDidMount(){
    this.getLoginData();
  }

  render(){
    return (
      <section className="home">
        <h1 className="home-title">Home page</h1>
        <div>{this.state.user.firstName !== '' ? "Welcome " + this.state.user.firstName : "You are not logged in"}</div>
        {this.state.user.firstName !== '' && 
          <LogoutButton />}
      </section>
    );
  }

  getLoginData = () => {
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
      url: "http://localhost:5000/api/User/oneuser",

    }).then(res => {
      console.log("Response Data: " + res.data);
      this.setState({ user: res.data });
      console.log("FirstName: " + this.state.user.firstName);

    }).catch(function (error){
      console.log("No user login found");

    })
  }
}

export default Home;
