import Header from "@/layouts/Header";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <>
      <Header />

      <main className="login">
        <h1>Se connecter</h1>
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
