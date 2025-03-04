import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { agreementItems, socialMenus } from '../../common';
import { useSignup } from '../../hooks/useAuthentication';
import { useEmailCheck, useEmailSend } from '../../hooks/useVerification';
import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from '../../hooks/useSocialLogin';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [emailValidate, setEmailValidate] = useState(false);
  const [otpShow, setOtpShow] = useState(false);

  const signupMutation = useSignup();
  const emailSendMutation = useEmailSend();
  const emailCheckMutation = useEmailCheck();
  const googleLoginMutation = useGoogleLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const naverLoginMutation = useNaverLogin();

  // 소셜 로그인 핸들러
  const socialLoginHandler = async (platform) => {
    if (platform === 'google') {
      googleLoginMutation.mutate();
    } else if (platform === 'kakao') {
      kakaoLoginMutation.mutate();
    } else if (platform === 'naver') {
      naverLoginMutation.mutate();
    }

    // const socialUrl = {
    //   google: 'http://211.49.53.89/api/v1/auth/google',
    //   naver: 'http://211.49.53.89/api/v1/auth/naver',
    //   kakao: 'http://211.49.53.89/api/v1/auth/kakao',
    // };
    //
    // const redirectUrl = socialUrl[platform];
    //
    // if (redirectUrl) {
    //   window.location.href = redirectUrl;
    // } else {
    //   console.log('소셜 로그인 실패');
    // }
  };

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
    emailSendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setOtpShow(true);
          alert('Please check your email.');
        },
      },
    );
  };

  // 이메일로 전송한 otp 인증
  const validateOtp = async () => {
    const emailInput = {
      email,
      code: otp,
    };

    emailCheckMutation.mutate(emailInput, {
      onSuccess: () => {
        setEmailValidate(true);
        setOtpShow(!otpShow);
      },
    });
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

    signupMutation.mutate(userInput);
  };

  return (
    <Container
      className={'mt-5'}
      style={{ maxWidth: '500px', marginTop: '50px' }}
    >
      <h3>Sign Up</h3>
      {emailSendMutation.isPending && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row className={'m-4'}>
        <text
          style={{
            fontSize: 'smaller',
            color: 'GrayText',
            textAlign: 'center',
          }}
        >
          SNS 계정으로 간편하게 회원가입
        </text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            margin: '15px 0',
          }}
        >
          {socialMenus.map((menu, index) => (
            <Button
              key={menu.id}
              onClick={() => socialLoginHandler(menu.name)}
              style={{
                border: 'none',
                background: 'transparent',
                marginBottom: '10px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              <Image
                src={menu.image}
                alt={menu.name}
                style={{ width: '150px', height: '50px' }}
              />
            </Button>
          ))}
        </div>

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
                disabled={emailValidate || !email}
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
            {signupMutation.isPending ? '회원 가입중' : '회원 가입'}
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUp;
