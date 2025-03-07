import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuthentication';
import { socialMenus } from '../../common';
import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from '../../hooks/useSocialLogin';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);

  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const naverLoginMutation = useNaverLogin();

  console.log('Error: ', loginMutation.error);
  console.log('isError: ', loginMutation.isError);

  // 소셜 로그인 핸들러
  const socialLoginHandler = async (platform) => {
    if (platform === 'google') {
      googleLoginMutation.mutate();
    } else if (platform === 'kakao') {
      kakaoLoginMutation.mutate();
    } else if (platform === 'naver') {
      naverLoginMutation.mutate();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // 이벤트 발생

    const userInput = {
      email,
      password,
    };

    loginMutation.mutate(userInput);

    // try {
    //   const { data, status } = await axios.post(
    //     'http://211.49.53.89:8000/api/v1/auth/login',
    //     userInput,
    //   );
    //
    //   if (status === 200) {
    //     console.log(data.accessToken);
    //     console.log(status);
    //
    //     localStorage.setItem('token', data.accessToken);
    //
    //     navigate('/profile');
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <Container
      className={'mt-5'}
      style={{ maxWidth: '500px', marginTop: '50px' }}
    >
      <h3>Login</h3>
      {loginMutation.isPending && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {loginMutation.error && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{loginMutation.error.response.data.message}</p>
        </Alert>
      )}
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

        <text
          className="mt-5"
          style={{
            fontSize: 'smaller',
            color: 'GrayText',
            textAlign: 'center',
          }}
        >
          SNS 계정으로 간편하게 로그인 / 회원가입
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
      </Row>
    </Container>
  );
};

export default Login;
