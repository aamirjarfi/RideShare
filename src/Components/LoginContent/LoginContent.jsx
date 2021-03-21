import React, { useContext, useState } from "react";
import "./LoginContent.css";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { validationSuite } from "./Validation/validationSuite";
import { Link, useHistory, useLocation } from "react-router-dom";
import { conditionalSignup } from "./../../App";
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
      <div className="d-flex flex-column align-items-center">
        <div className="w-75 m-2">
          <button
            onClick={() => socialMediaLogin(GoogleProvider, setError, redirect)}
            className="btn google_btn_style rounded-pill w-100 btn_flex_style"
          >
            {/* <FontAwesomeIcon size="2x" icon={faGoogle} className="float-left" /> */}
            <img
              style={{ maxWidth: "30px" }}
              src="data:image/png;base64,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"
              alt=""
              className="float-left rounded-pill pt-1"
            />
            <span className="d-block pt-1 mx-auto">Continue with Google</span>
          </button>
        </div>
        <div className="w-75 m-2">
          <button
            onClick={() =>
              socialMediaLogin(FacebookProvider, setError, redirect)
            }
            className="btn rounded-pill w-100 fb_btn_style btn_flex_style"
          >
            <FontAwesomeIcon
              size="2x"
              icon={faFacebook}
              color="#FFF"
              className="float-left"
            />
            <span className="d-block pt-1 mx-auto">Continue with Facebook</span>
          </button>
        </div>
        <div className="w-75 m-2">
          <button
            onClick={() => socialMediaLogin(GithubProvider, setError, redirect)}
            className="btn btn-dark rounded-pill w-100 btn_flex_style"
          >
            <FontAwesomeIcon size="2x" icon={faGithub} className="float-left" />
            <span className="d-block pt-1 mx-auto">Continue with Github</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginContent;
