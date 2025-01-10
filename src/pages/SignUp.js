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

  const [terms, setTerms] = useState({
    agreeOfTerm: false,
    overFourteen: false,
    agreeOfPersonalInfo: false,
    agreeOfMarketing: false,
    agreeOfEvent: false,
  });

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

    if (
      !terms.agreeOfTerm ||
      !terms.overFourteen ||
      !terms.agreeOfPersonalInfo
    ) {
      alert('Please Agree Terms');
    }

    const userInput = {
      username: name,
      email,
      password,
      phone,
      agreeOfTerm: terms,
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
              variant={emailValidate ? 'success' : 'primary'}
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
                variant="outline-primary"
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

          <Form.Group className="mb-3" controlId="formTerms">
            <Form.Label>Agree Of Term</Form.Label>
            <Form.Check
              type="checkbox"
              label={<span className="text-danger">Agree Of Term</span>}
              checked={terms.agreeOfTerm}
              onChange={(event) =>
                setTerms((prevTerms) => ({
                  ...prevTerms,
                  agreeOfTerm: event.target.checked,
                }))
              }
              required
            />

            <Form.Check
              type="checkbox"
              label={<span className="text-danger">Over Fourteen</span>}
              checked={terms.overFourteen}
              onChange={(event) =>
                setTerms((prevTerms) => ({
                  ...prevTerms,
                  overFourteen: event.target.checked,
                }))
              }
              required
            />

            <Form.Check
              type="checkbox"
              label={
                <span className="text-danger">Agree Of Personal Info</span>
              }
              checked={terms.agreeOfPersonalInfo}
              onChange={(event) =>
                setTerms((prevTerms) => ({
                  ...prevTerms,
                  agreeOfPersonalInfo: event.target.checked,
                }))
              }
              required
            />

            <Form.Check
              type="checkbox"
              label="Agree Of Event"
              checked={terms.agreeOfEvent}
              onChange={(event) =>
                setTerms((prevTerms) => ({
                  ...prevTerms,
                  agreeOfEvent: event.target.checked,
                }))
              }
              required
            />

            <Form.Check
              type="checkbox"
              label="Agree Of Marketing"
              checked={terms.agreeOfMarketing}
              onChange={(event) =>
                setTerms((prevTerms) => ({
                  ...prevTerms,
                  agreeOfMarketing: event.target.checked,
                }))
              }
              required
            />
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
