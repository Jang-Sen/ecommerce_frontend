import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  // console.log(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState({});
  const [newImage, setNewImage] = useState(null);

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
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
      }

      console.log(data.body);
      console.log(status);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container className="mb-5">
      <Row>
        <Col md={5}>
          <Image
            src={userInfo.profileImg}
            alt={userInfo.username}
            fluid
            className="rounded shadow"
          />
        </Col>

        <Col md={6}>
          <h2>{userInfo.username}</h2>
        </Col>
        <Form onSubmit={updateUserImage}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button type="submit">update image</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Profile;
