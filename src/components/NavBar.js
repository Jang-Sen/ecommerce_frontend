import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useUserInfo } from '../hooks/useUserInfo';
import { useAuth } from '../context/authContext';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const { data, error, isPending, isError } = useUserInfo();

  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const logoutHandler = () => {
    logout();
    queryClient.removeQueries(['user']);
    navigate('/');
  };

  // console.log(localStorage.getItem('token'));

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/')}
          className="fw-bold"
          style={{ cursor: 'pointer' }}
        >
          Jangwon Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/product')}>Product</Nav.Link>
            <Nav.Link onClick={() => navigate('/movie')}>Movie</Nav.Link>
          </Nav>
          <Nav>
            {data?.username ? (
              <>
                <Nav.Link onClick={() => navigate('/profile')}>
                  {data?.email}
                </Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate('/signup')}>Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
