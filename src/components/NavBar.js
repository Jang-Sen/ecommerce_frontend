import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Jangwon-Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="underline">
            <Nav.Link href="/">Product</Nav.Link>
            <Nav.Link href="/movie">Movie</Nav.Link>
          </Nav>
          <Nav className="ms-auto" variant="underline">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
