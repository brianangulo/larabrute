import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import RegisterModal from "./Register";

function NavBar() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <div className="container" >
          <Navbar.Brand className="ml-auto">Brute Force-It</Navbar.Brand>
          <Nav.Link><RegisterModal /></Nav.Link>
          <Navbar.Collapse id="responsive-navbar-nav">
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
}

export default NavBar;