import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PasswordChange = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/find/password');
    }
  }, []);

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('비밀번호 불일치');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/api/v1/auth/change/password',
        {
          token,
          password: newPassword,
        },
      );

      console.log(response);

      if (response.status === 201) {
        console.log('비밀번호 변경 성공');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      console.log('비밀번호 변경 실패');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h3>비밀번호 변경</h3>
      <Row className="mt-4">
        <Form onSubmit={changePasswordHandler}>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            비밀번호 변경
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default PasswordChange;
