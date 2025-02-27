import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useUserInfo } from '../hooks/useUserInfo';
import { useAuth } from '../context/authContext';
import { useQueryClient } from '@tanstack/react-query';

const NavBar = () => {
  // const navigate = useNavigate();

  const { data, error, isPending, isError } = useUserInfo();

  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const logoutHandler = () => {
    // logout();
    // queryClient.removeQueries(['user']);
    // navigate('/login');
  };

  console.log(localStorage.getItem('token'));

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/product" className="fw-bold">
          Jangwon Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/movie">Movie</Nav.Link>
          </Nav>
          <Nav>
            {data?.username ? (
              <>
                <Nav.Link href="/profile">{data?.email}</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
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
