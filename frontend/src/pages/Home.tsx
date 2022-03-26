import "./styles/Home.scss";
import GetUserResponse from "../responses/GetUserResponse"
import StockTable from "./components/StockTable";

interface Props {
  user: GetUserResponse,
  setUser: (user: GetUserResponse) => void
}

const Home = (props: Props) => {

  return (
    <section className="home">
      <h1 className="home-title">Home</h1>
      <div>{props.user.firstName !== "" ? "Welcome " + props.user.firstName : "You are not logged in"}</div>
      <div>{props.user.firstName !== "" ? <StockTable /> : ""}</div>
    </section>
  );
}

export default Home;
