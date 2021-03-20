import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { conditionalSignup } from "../../App";
import { auth, signOut, verifyEmail } from "./../../Firebase";
import { UserContext } from "./../../App";
import { Avatar } from "@material-ui/core";
import profileImg from "./../../Resources/images/profileImg.png";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
const Header = () => {
  const [isCreateNewAccount, setIsCreateNewAccount] = useContext(
    conditionalSignup
  );

  const [isLoggedInUser, setIsLoggedInUser] = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Navbar
      style={{ backgroundColor: "transparent" }} // ==> transparent
      expand="sm"
      className={`w-100 bg-light`}
    >
      <Container>
        <Link to="/home" className="navbar-brand text-danger font-weight-bold">
          RideShare
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center font-weight-bold">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/destination/bike" className="nav-link">
              Destination
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            {auth.currentUser ? (
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <div
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex">
                      <Avatar
                        alt="Profile"
                        src={auth.currentUser.photoURL || profileImg}
                        className={classes.small}
                      />
                      <span className="ml-1 text-danger">
                        {auth.currentUser.displayName}
                      </span>
                    </div>
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    {auth.currentUser.emailVerified === false && (
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          verifyEmail();
                        }}
                      >
                        Verify Email
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        signOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                <Button
                  onClick={() => setIsCreateNewAccount("login")}
                  variant="danger"
                >
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
