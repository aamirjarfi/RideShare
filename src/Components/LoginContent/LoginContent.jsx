import React, { useContext, useState } from "react";
import "./LoginContent.css";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { validationSuite } from "./Validation/validationSuite";
import { Link, useHistory, useLocation } from "react-router-dom";
import { conditionalSignup, UserContext } from "./../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  FacebookProvider,
  GoogleProvider,
  signInWithEmail,
  signUpWithEmail,
  socialMediaLogin,
  GithubProvider,
} from "./../../Firebase";

const LoginContent = () => {
  const [isLoggedInUser, setIsLoggedInUser] = useContext(UserContext);

  const [isCreateNewAccount, setIsCreateNewAccount] = useContext(
    conditionalSignup
  );

  const { handleSubmit, register, errors, reset } = useForm({
    resolver: vestResolver(validationSuite),
  });

  const showError = (errName) => errName && errName.message;
  const [error, setError] = useState({
    isError: false,
    errCode: "",
    errMsg: "",
  });

  const resetError = () => {
    setError({
      isError: false,
      errCode: "",
      errMsg: "",
    });
  };

  console.log(errors);

  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  let redirect = () => {
    history.replace(from);
    console.log(from);
    console.log("redirected");
  };

  return (
    <>
      <Card
        style={{ minWidth: "10rem" }}
        className={isCreateNewAccount === "signup" && "cardMargin"}
      >
        <Card.Header className="font-weight-bold">
          {isCreateNewAccount === "login" ? "Login" : "Create Account"}
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            {error.isError && error.errCode === "auth/user-not-found" && (
              <Alert variant="danger">User Not Found</Alert>
            )}
            {error.isError && error.errCode === "auth/wrong-password" && (
              <Alert variant="danger">The password is invalid</Alert>
            )}
            {error.isError && error.errCode === "auth/popup-closed-by-user" && (
              <Alert variant="danger">{error.errMsg}</Alert>
            )}
            {error.isError &&
              error.errCode ===
                "auth/account-exists-with-different-credential" && (
                <Alert variant="danger">{error.errMsg}</Alert>
              )}
            {error.isError && error.errCode === "PasswordNotMatched" && (
              <Alert variant="danger" className="text-center">
                {error.errMsg}
              </Alert>
            )}
          </div>
          <Form
            onSubmit={handleSubmit((data) => {
              resetError();
              isCreateNewAccount === "signup"
                ? signUpWithEmail(
                    data.email,
                    data.confirm_password,
                    data.name,
                    redirect,
                    setError
                  )
                : signInWithEmail(
                    data.email,
                    data.password,
                    redirect,
                    setError
                  );
              if (error.isError === true) {
                reset();
              }
            })}
          >
            {isCreateNewAccount === "signup" && (
              <Form.Group>
                <Form.Label className="d-flex justify-content-between">
                  <span>Name</span>
                  <span className="text-danger">{showError(errors.name)}</span>
                </Form.Label>
                <Form.Control
                  placeholder="Type Your Name"
                  name="name"
                  ref={register}
                ></Form.Control>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label className="d-flex justify-content-between">
                <span>Email</span>
                <span className="text-danger">{showError(errors.email)}</span>
              </Form.Label>
              <Form.Control
                placeholder="Type your email"
                name="email"
                ref={register}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex justify-content-between">
                <span>Password</span>
                <span className="text-danger">
                  {showError(errors.password)}
                </span>
              </Form.Label>
              <Form.Control
                placeholder="Type Your Password"
                type="password"
                name="password"
                ref={register}
              ></Form.Control>
            </Form.Group>

            {isCreateNewAccount === "signup" && (
              <Form.Group>
                <Form.Label className="d-flex justify-content-between">
                  <span>Confirm Password</span>
                  <span className="text-danger">
                    {showError(errors.confirm_password)}
                  </span>
                </Form.Label>
                <Form.Control
                  placeholder="Type Your Confirm Password"
                  name="confirm_password"
                  ref={register}
                ></Form.Control>
              </Form.Group>
            )}

            <div className="d-flex justify-content-between">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Link to="#forget_password">Forget Password</Link>
            </div>
            <Button
              onClick={() => console.log(errors)}
              type="submit"
              variant="danger"
              className="w-100 mt-3"
            >
              {isCreateNewAccount === "login" ? "Log In" : "Sign Up"}
            </Button>
          </Form>
          <p className="text-center mt-4 mb-0">
            Don’t have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-danger"
              onClick={() =>
                isCreateNewAccount === "login"
                  ? setIsCreateNewAccount("signup")
                  : setIsCreateNewAccount("login")
              }
            >
              {isCreateNewAccount === "login" ? "Create an account" : "Log In"}
            </span>
          </p>
        </Card.Body>
      </Card>
      <p className="or_text">
        <span>Or</span>
      </p>
      <div className="text-center">
        <div className="position-relative">
          <FontAwesomeIcon
            icon={faGoogle}
            size="2x"
            className="position-absolute"
            style={{ top: "3px",left: "73px", color:'#dd4a5a' }}
          />
          <Button
            onClick={() => socialMediaLogin(GoogleProvider, setError)}
            className="w-75 mb-3 rounded-pill"
            variant="outline-danger"
          >
            Sign in with Google
          </Button>
        </div>
        <div className="position-relative">
          <FontAwesomeIcon
            size="2x"
            icon={faFacebook}
            className="position-absolute rounded-pill"
            style={{ top: "3px", left: "73px", color: "#3076FF" }}
          />
          <Button
            onClick={() => socialMediaLogin(FacebookProvider, setError)}
            className="w-75  mb-3 rounded-pill"
            variant="outline-success"
          >
            Sign in with Facebook
          </Button>
        </div>
        <div className="position-relative">
          <FontAwesomeIcon
            size="2x"
            icon={faGithub}
            className="position-absolute rounded-pill"
            style={{ top: "3px",left: "73px", }}
          />
          <Button
            onClick={() => socialMediaLogin(GithubProvider, setError)}
            className="w-75  mb-3 rounded-pill"
            variant="outline-info"
          >
            Sign in with Github
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginContent;
