import LoginForm from "./components/LoginForm";

interface Props {
  setLoggedIn: (loggedIn: boolean) => void
}

const Login = (props: Props) => {
  return (
    <section>
      <LoginForm setLoggedIn={props.setLoggedIn} />
    </section>
  );
}

export default Login;