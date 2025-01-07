import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const PasswordChange = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 이메일 인증 요청
  const emailValidateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost/api/v1/auth/find/password', { email });
      setStep(2);
    } catch (e) {
      console.log(e);
    }

    console.log(email);
  };

  // 비밀번호 변경 요청
  const changePasswordHandler = async (e) => {
    e.preventDefault();

    const userInput = {
      token,
      password: newPassword,
    };

    if (newPassword !== confirmPassword) {
      alert('Password Do Not Matched.');
    }

    try {
      await axios.post(
        'http://localhost/api/v1/auth/change/password',
        userInput,
      );
    } catch (e) {
      console.log(e);
    }

    console.log(userInput);
  };

  return (
    <Container className={'mt-5'}>
      <Row className={'mt-4'}>
        {step === 1 && (
          <Form onSubmit={emailValidateHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Check
            </Button>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={() => setStep(3)}>
            <Form.Group className={'mt-3'} controlId="formBasicToken">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Verification Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Verify Code
            </Button>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={changePasswordHandler}>
            <Form.Group className={'mb-3'} controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className={'mb-3'} controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        )}
      </Row>
    </Container>
  );
};

export default PasswordChange;
