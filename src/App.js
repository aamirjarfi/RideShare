import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Destination from "./Components/Destination/Destination";
import { auth } from "./Firebase";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { PrivateRoute2 } from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = React.createContext();
export const conditionalSignup = React.createContext();

function App() {
  const [isLoggedInUser, setIsLoggedInUser] = useState({});
  const [isCreateNewAccount, setIsCreateNewAccount] = useState("login");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedInUser(user);
      } else {
        setIsLoggedInUser({});
        console.log("user not found");
      }
    });
  }, [setIsLoggedInUser]);

  return (
    <UserContext.Provider value={[isLoggedInUser, setIsLoggedInUser]}>
      <conditionalSignup.Provider
        value={[isCreateNewAccount, setIsCreateNewAccount]}
      >
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <PrivateRoute2 exact path="/login">
            <Login />
          </PrivateRoute2>
          <PrivateRoute exact path="/destination/:vehicleName">
            <Destination />
          </PrivateRoute>
        </Switch>
      </conditionalSignup.Provider>
    </UserContext.Provider>
  );
}

export default App;
