import "./styles/Home.scss";
import GetUserResponse from "../responses/GetUserResponse"

const Home = (props: {user: GetUserResponse, setUser: (user: GetUserResponse) => void}) => {

  return (
    <section className="home">
      <h1 className="home-title">Home page</h1>

      <div>{props.user.firstName !== "" ? "Welcome " + props.user.firstName : "You are not logged in"}</div>

    </section>
  );

}

export default Home;
