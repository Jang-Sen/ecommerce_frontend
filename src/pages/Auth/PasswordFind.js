import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { usePasswordFind } from '../../hooks/useResetPassword';

const PasswordFind = () => {
  // const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  // const [token, setToken] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const passwordFindMutation = usePasswordFind();

  // 이메일 인증 요청
  const emailValidateHandler = async (e) => {
    e.preventDefault();

    passwordFindMutation.mutate({ email });

    // try {
    //   const response = await axios.post(
    //     'http://localhost/api/v1/auth/find/password',
    //     { email },
    //   );
    //
    //   alert(response.data);
    //
    //   if (response.status === 200) {
    //     console.log('이메일 토큰 전송 완료');
    //   }
    // } catch (e) {
    //   console.log(e);
    //   console.log('전송 실패');
    // }
    //
    // console.log(email);
  };

  // 비밀번호 변경 요청
  // const changePasswordHandler = async (e) => {
  //   e.preventDefault();
  //
  //   const userInput = {
  //     token,
  //     password: newPassword,
  //   };
  //
  //   if (newPassword !== confirmPassword) {
  //     alert('Password Do Not Matched.');
  //   }
  //
  //   try {
  //     await axios.post(
  //       'http://localhost/api/v1/auth/change/password',
  //       userInput,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  //
  //   console.log(userInput);
  // };

  return (
    <Container
      className={'mt-5'}
      style={{ maxWidth: '500px', marginTop: '50px' }}
    >
      <h3>비밀번호 재설정</h3>
      <Row className={'mt-4'}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="mb-1">
              <Form.Text style={{ fontSize: 'small' }}>
                가입한 이메일 주소를 입력해주세요.
              </Form.Text>
            </div>

            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailVerified}
              />
            </InputGroup>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            onClick={emailValidateHandler}
          >
            이메일로 인증코드 받기
          </Button>
        </Form>

        {/*{step === 2 && (*/}
        {/*  <Form onSubmit={() => setStep(3)}>*/}
        {/*    <Form.Group className={'mt-3'} controlId="formBasicToken">*/}
        {/*      <Form.Label>Verification Code</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="text"*/}
        {/*        placeholder="Verification Code"*/}
        {/*        value={token}*/}
        {/*        onChange={(e) => setToken(e.target.value)}*/}
        {/*        required*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Button variant="primary" type="submit">*/}
        {/*      Verify Code*/}
        {/*    </Button>*/}
        {/*  </Form>*/}
        {/*)}*/}

        {/*{step === 3 && (*/}
        {/*  <Form onSubmit={changePasswordHandler}>*/}
        {/*    <Form.Group className={'mb-3'} controlId="formBasicPassword">*/}
        {/*      <Form.Label>New Password</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="password"*/}
        {/*        placeholder="New Password"*/}
        {/*        value={newPassword}*/}
        {/*        onChange={(e) => setNewPassword(e.target.value)}*/}
        {/*        required*/}
        {/*      />*/}
        {/*    </Form.Group>*/}

        {/*    <Form.Group className={'mb-3'} controlId="formBasicPassword">*/}
        {/*      <Form.Label>Confirm Password</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="password"*/}
        {/*        placeholder="Confirm Password"*/}
        {/*        value={confirmPassword}*/}
        {/*        onChange={(e) => setConfirmPassword(e.target.value)}*/}
        {/*        required*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Button variant="primary" type="submit">*/}
        {/*      Change Password*/}
        {/*    </Button>*/}
        {/*  </Form>*/}
        {/*)}*/}
      </Row>
    </Container>
  );
};

export default PasswordFind;
