import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsCardChecklist } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const NavBar = (props) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <BsCardChecklist></BsCardChecklist>&nbsp;&nbsp;Study Plan
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!props.loggedIn && <Nav.Link href="/login"> Login</Nav.Link>}
              {props.loggedIn && <Nav.Link onClick={props.handleLogout}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar 
