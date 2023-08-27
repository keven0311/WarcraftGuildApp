import React, { useEffect } from "react";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../store/slices/userSlice";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function TopNavbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4000/api/user",
    "logInDiv"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
    }

    google.accounts.id.renderButton(document.getElementById("logInDiv"), {
      theme: "filled_white",
      size: "large",
      text: "signin_with",
      shape: "pill",
      type: "icon",
    });

    // google.accounts.id.prompt();
  }, [handleGoogle]);

  const handleLogOut = () => {
    dispatch(setUser({}));
    document.getElementById("logInDiv").hidden = false;
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">WarcraftGuild</Navbar.Brand>
        <div className="mx-5">
          {Object.keys(user).length !== 0 ? (
            <p>Hi, {user.name}</p>
          ) : (
            <p>Welcome!</p>
          )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-5">
            {/* <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <div id="logInDiv"></div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                {Object.keys(user).length !== 0 ? (
                  <Button
                    id="logOutButton"
                    variant="light"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Button>
                ) : null}
              </NavDropdown.Item>
               <NavDropdown.Divider /> 
             </NavDropdown>  */}
            <div id="logInDiv"></div>
            {Object.keys(user).length !== 0 ? (
              <Button id="logOutButton" variant="light" onClick={handleLogOut}>
                Log Out
              </Button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;