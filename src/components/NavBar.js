import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  console.log(localStorage.getItem('token'));

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Jangwon Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Product</Nav.Link>
            <Nav.Link href="/movie">Movie</Nav.Link>
          </Nav>
          <Nav>
            {localStorage.getItem('token') ? (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
