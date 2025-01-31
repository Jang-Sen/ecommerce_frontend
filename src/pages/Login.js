import React, { useEffect, useState } from 'react';
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
        'http://211.49.53.89:8000/api/v1/auth/login',
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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  }, []);

  return (
    <Container
      className={'mt-5'}
      style={{ maxWidth: '500px', marginTop: '50px' }}
    >
      <h3>Login</h3>
      <Row className={'mt-4'}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <Button variant="primary" type="submit" className="w-100">
            로그인
          </Button>
          <Link
            to={'/find/password'}
            className="btn btn-outline-primary w-50 mt-2"
          >
            비밀번호 재설정
          </Link>
          <Link to={'/signup'} className="btn btn-outline-primary w-50 mt-2">
            회원가입
          </Link>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
