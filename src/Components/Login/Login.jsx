import React from "react";
import "./Login.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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

/***
 * import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
 * 
 * 
 * <Card style={{ minWidth: "10rem" }}>
          <Card.Header className="font-weight-bold">Login</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-between">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Link to="/forget_password">Forget Password</Link>
            </div>
            <Button variant="danger" className="w-100 mt-3">
              Log In
            </Button>
            <p className="text-center mt-4 mb-0">
              Don’t have an account?{" "}
              <span className="text-danger">Create an account</span>
            </p>
          </Card.Body>
        </Card>
        <p className="or_text">
          <span>Or</span>
        </p>
        <div className="text-center">
          <Button className="w-75 mb-3 rounded-pill" variant="outline-danger">
            Sign in with Google
          </Button>
          <Button className="w-75  mb-3 rounded-pill" variant="outline-success">
            Sign in with Facebook
          </Button>
          <Button className="w-75  mb-3 rounded-pill" variant="outline-info">
            Sign in with Twitter
          </Button>
        </div>
 */
