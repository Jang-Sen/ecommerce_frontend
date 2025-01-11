import React, { useState } from 'react';
import { Button, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault(); // 이벤트 발생

    const userInput = {
      email,
      password,
    };

    try {
      const { data, status } = await axios.post(
        'http://localhost/api/v1/auth/login',
        userInput,
      );

      if (status === 200) {
        console.log(data.accessToken);
        console.log(status);

        localStorage.setItem('token', data.accessToken);

        navigate('/profile');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className={'mt-5'}>
      <h1>Login</h1>
      <Row className={'mt-4'}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Link to={'/password'}>Change Password</Link> /
          <Link to={'/signup'}> Sign Up</Link>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
