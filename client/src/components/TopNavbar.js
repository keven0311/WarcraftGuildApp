import React from "react";
import "../styles/navbar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function TopNavbar({ handleLogOut }) {
  const user = useSelector(selectUser);

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
        <Button href="/guild" variant="link">
          Guilds
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-5">
            <NavDropdown title="menu" id="basic-nav-dropdown">
              {Object.keys(user).length > 0 ? (
                <NavDropdown.Item
                  href={`/profile/${user.name}`}
                  variant="outline-primary"
                >
                  Profile
                </NavDropdown.Item>
              ) : null}

              <NavDropdown.Divider />

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
            </NavDropdown>
            <div id="logInDiv"></div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
