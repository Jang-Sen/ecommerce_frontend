import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  // console.log(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [newImage, setNewImage] = useState(null);

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    if (name in userInfo) {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name in userProfile) {
      setUserProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();

    const config = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    try {
      const formData = {
        ...userInfo,
        profile: userProfile,
      };
      console.log(formData);

      const { data, status } = await axios.put(
        'http://localhost/api/v1/user',
        formData,
        config,
      );

      if (status === 200) {
        console.log('Update Data', data);
        console.log('Update Form Data', formData);
        alert('프로필 업데이트 성공');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateUserImage = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const formData = new FormData();
      formData.append('img', newImage);

      console.log(formData);

      const { data, status } = await axios.put(
        'http://localhost/api/v1/user',
        formData,
        config,
      );

      if (status === 200) {
        setUserInfo(data.body);
        alert('프로필 업데이트 완료');
      }

      console.log('______________________________', data);
      console.log(status);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserInfo();

    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      const { data, status } = await axios.get(
        'http://localhost/api/v1/auth',
        config,
      );

      if (status === 200) {
        setUserInfo(data.body);
        setUserProfile(data.body.profile);
      }

      console.log('User Profile', data.body.profile);

      console.log('User Info', data.body);
      console.log(status);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container
      className="mb-5"
      style={{ maxWidth: '600px', marginTop: '50px' }}
    >
      <h3>Profile</h3>
      <Row className="mt-5">
        <Col md={5} className="text-center">
          <Image
            src={userInfo.profileImg}
            alt={userInfo.username}
            fluid
            className="rounded shadow"
            style={{ marginBottom: '33px' }}
          />

          <Form onSubmit={updateUserImage}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button type="submit" variant="outline-primary" className="w-100">
              이미지 업데이트
            </Button>
          </Form>
        </Col>

        <Col md={7}>
          <Form onSubmit={updateUserInfo}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userInfo.username}
                onChange={(event) =>
                  setUserInfo({ username: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>휴대폰 번호</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={userInfo.phone}
                disabled
              />
            </Form.Group>
            {/*    </Form>*/}
            {/*  </Col>*/}
            {/*</Row>*/}

            {/*<Row className={'mt-3'}>*/}
            {/*  <Col md={12}>*/}
            {/*    <Form>*/}
            <Form.Group controlId="formBirth" className={'mb-3'}>
              <Form.Label>생년월일</Form.Label>
              <Form.Control
                type="date"
                name="birth"
                value={userProfile.birth}
                onChange={(event) =>
                  setUserProfile({ birth: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formGender" className="mb-3">
              <Form.Label>성별</Form.Label>
            </Form.Group>

            <Form.Group controlId="formIntroduce" className="mb-3">
              <Form.Label>1줄 소개</Form.Label>
              <Form.Control
                type="text"
                name="introduce"
                value={userProfile.introduce}
                placeholder="짧은 글로 자신을 소개해보세요. (최대 50자)"
                onChange={(event) =>
                  setUserProfile({ introduce: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formSnsLink" className="mb-3">
              <Form.Label>SNS 링크</Form.Label>
              <Form.Control
                type="url"
                name="snsLink"
                value={userProfile.snsLink}
                placeholder="https://www.example.com"
                onChange={(event) =>
                  setUserProfile({ snsLink: event.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              프로필 저장
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
