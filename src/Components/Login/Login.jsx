import React from "react";
import "./Login.css";
import { Container } from "react-bootstrap";
import LoginContent from "../LoginContent/LoginContent";
const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <section className="w-100" style={{ maxWidth: "570px" }}>
        <LoginContent />
      </section>
    </Container>
  );
};

export default Login;