import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [emailValidate, setEmailValidate] = useState(false);

  // 이메일 인증
  const sendValidateEmail = async () => {
    try {
      await axios.post('http://localhost/api/v1/auth/email/send', { email });
      alert('send email otp');
    } catch (e) {
      console.log(e);
    }
  };

  // 이메일로 전송한 otp 인증
  const validateOtp = async () => {
    const emailInput = {
      email,
      code: otp,
    };
    try {
      await axios.post('http://localhost/api/v1/auth/email/check', emailInput);
      setEmailValidate(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 회원가입
  const signupHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not matched');
    }

    if (!emailValidate) {
      alert('Please validate your email.');
    }

    const userInput = {
      username: name,
      email,
      password,
      phone,
    };

    try {
      await axios.post('http://localhost/api/v1/auth/signup', userInput);
      alert('Success');
    } catch (e) {
      alert('Fail');
      console.log(e);
    }

    console.log(userInput);
  };

  return (
    <Container className={'mt-5'}>
      <h1>Sign Up</h1>
      <Row className={'mt-4'}>
        <Form onSubmit={signupHandler}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email(example@email.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={emailValidate}
            />
            <Button
              variant="secondary"
              className={'mt-2'}
              onClick={sendValidateEmail}
              disabled={emailValidate}
            >
              {emailValidate ? 'Email Validated' : 'Send Validation Email'}
            </Button>
          </Form.Group>

          {!emailValidate && (
            <Form.Group className={'mb-3'} controlId="formBasicValidate">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button
                variant="secondary"
                className={'mt-2'}
                onClick={validateOtp}
              >
                Validate OTP
              </Button>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="01095110662"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUp;
