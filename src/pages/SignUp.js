import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 체크박스 항목 데이터
const agreementItems = [
  { key: 'overFourteen', label: '만 14세 이상 (필수)' },
  { key: 'agreeOfTerm', label: '이용약관 (필수)' },
  { key: 'agreeOfPersonalInfo', label: '개인정보 수집 및 이용 동의 (필수)' },
  { key: 'agreeOfMarketing', label: '개인정보 마케팅 활용 동의 (선택)' },
  {
    key: 'agreeOfEvent',
    label: '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신 (선택)',
  },
];

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [emailValidate, setEmailValidate] = useState(false);
  const [otpShow, setOtpShow] = useState(false);

  // 초기 상태 설정 (전체 동의 포함)
  const initialAgreements = Object.fromEntries([
    ['all', false],
    ...agreementItems.map((item) => [item.key, false]),
  ]);

  const [agreements, setAgreements] = useState(initialAgreements);

  const handleAllCheck = () => {
    const newValue = !agreements.all;
    const updatedAgreements = { all: newValue };

    agreementItems.forEach((item) => {
      updatedAgreements[item.key] = newValue;
    });

    setAgreements(updatedAgreements);
  };

  // 개별 항목 체크/해제
  const handleSingleCheck = (key) => {
    const updatedAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };

    // 모든 항목이 체크되었는지 확인
    const allChecked = agreementItems.every(
      (item) => updatedAgreements[item.key],
    );

    updatedAgreements.all = allChecked;

    setAgreements(updatedAgreements);
  };

  // 이메일 인증
  const sendValidateEmail = async () => {
    try {
      await axios.post('http://localhost/api/v1/auth/email/send', { email });
      setOtpShow(true);
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
      setOtpShow(!otpShow);
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
      agreeOfTerm: agreements,
    };

    try {
      const { data, status } = await axios.post(
        'http://localhost/api/v1/auth/signup',
        userInput,
      );

      if (status === 201) {
        alert('Success');
        navigate('/login');
      }
    } catch (e) {
      alert('Fail');
      console.log(e);
    }

    console.log(userInput);
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
      <h3>Sign Up</h3>
      <Row className={'mt-4'}>
        <Form onSubmit={signupHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email(example@email.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={emailValidate}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={sendValidateEmail}
                disabled={emailValidate}
              >
                Send Email
              </Button>
            </InputGroup>
          </Form.Group>

          {/* <Button*/}
          {/*//   variant={emailValidate ? 'success' : 'primary'}*/}
          {/*//   className={'mt-2'}*/}
          {/*//   onClick={sendValidateEmail}*/}
          {/*//   disabled={emailValidate}*/}
          {/*// >*/}
          {/*//   {emailValidate ? 'Email Validated' : 'Send Validation Email'}*/}
          {/*// </Button>*/}

          {otpShow ? (
            <Form.Group className={'mb-3'} controlId="formBasicValidate">
              <Form.Label>
                <strong>OTP</strong>
              </Form.Label>
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
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <strong>Password</strong>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>
              <strong>Confirm Password</strong>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>
              <strong>Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>
              <strong>Phone</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="01095110662"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="m-2 mt-4">
            <Form.Label>
              <strong>약관 동의</strong>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label={
                <>
                  <strong>전체 동의 </strong>
                  <text style={{ color: 'gray', fontSize: 'small' }}>
                    선택항목에 대한 동의 포함
                  </text>
                </>
              }
              checked={agreements.all}
              onChange={handleAllCheck}
            />
          </Form.Group>

          {agreementItems.map((item) => (
            <Form.Group key={item.key} className="m-2">
              <Form.Check
                type="checkbox"
                label={item.label}
                checked={agreements[item.key]}
                onChange={() => handleSingleCheck(item.key)}
              />
            </Form.Group>
          ))}

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUp;
