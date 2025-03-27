import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useUpdateProfile, useUserInfo } from '../hooks/useUserInfo';

const Profile = () => {
  const { data: user, isPending } = useUserInfo();
  const { mutate: updateUserInfo } = useUpdateProfile();

  console.log('@@@@@@@@@@@@@@@@@@@@@@', user);

  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);

  // 프로필 기본값 설정
  const [userData, setUserData] = useState({
    birth: user?.profile?.birth ? user.profile.birth.split('T')[0] : '',
    gender: user?.profile?.gender || 'default',
    introduce: user?.profile?.introduce || '소개글이 없습니다.',
    snsLink: user?.profile?.snsLink || '',
  });

  // 입력 변경 핸들러
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정 완료 핸들러
  const saveHandler = () => {
    const updateData = new FormData();
    Object.keys(userData).forEach((key) => {
      updateData.append(`profile.${key}`, userData[key]);
    });

    updateUserInfo(updateData, {
      onSuccess: () => setIsEditing(false),
    });
  };

  useEffect(() => {}, [user]);

  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', user);

  if (isPending) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          {/* 기본 정보 */}
          <Card>
            <Card.Body className="text-center">
              <img
                src={user?.profileImg}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
              />
              <Card.Title>{user?.username}</Card.Title>
              <Card.Text style={{ color: 'GrayText' }}>
                <strong>{user?.email}</strong>
              </Card.Text>
              <Card.Text>📞 {user?.phone}</Card.Text>
              {user?.provider !== 'local' && (
                <Card.Text>
                  ⭐️ 가입 경로:{' '}
                  {user?.provider === 'google'
                    ? '구글'
                    : user?.provider === 'kakao'
                      ? '카카오'
                      : user?.provider === 'naver'
                        ? '네이버'
                        : ''}
                </Card.Text>
              )}
              <Card.Text>
                🗓 가입일: {new Date(user?.createdAt).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* 프로필 정보 */}
          <Card className="mt-3">
            <Card.Body className="text-center">
              <h5 className="mb-3">프로필 정보</h5>

              {isEditing ? (
                // 수정 모드
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>
                      <strong>🎂 생년월일</strong>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="birth"
                      value={userData.birth}
                      onChange={changeHandler}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>
                      <strong>🚻 성별</strong>
                    </Form.Label>
                    <Form.Select
                      name="gender"
                      value={userData.gender}
                      onChange={changeHandler}
                    >
                      <option value="default">선택 안함</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>
                      <strong>💬 한줄 소개</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="introduce"
                      value={userData.introduce}
                      onChange={changeHandler}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>
                      <strong>🔗 SNS 링크</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="snsLink"
                      value={userData.snsLink}
                      placeholder="https://www.example.com"
                      onChange={changeHandler}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={saveHandler}
                  >
                    저장
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-100 mt-2"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </Button>
                </Form>
              ) : (
                // 보기 모드
                <>
                  <p>
                    <strong>🎂 생년월일:</strong> {userData.birth}
                  </p>
                  <p>
                    <strong>🚻 성별:</strong>{' '}
                    {userData.gender === 'male'
                      ? '남성'
                      : userData.gender === 'female'
                        ? '여성'
                        : '선택 안함'}
                  </p>
                  <p>
                    <strong>💬 한줄 소개:</strong> {userData.introduce}
                  </p>
                  {userData.snsLink && (
                    <p>
                      <strong>🔗 SNS:</strong>{' '}
                      <a
                        href={userData.snsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userData.snsLink}
                      </a>
                    </p>
                  )}
                  <Button
                    variant="outline-primary"
                    className="w-100 mt-3"
                    onClick={() => setIsEditing(true)}
                  >
                    수정하기
                  </Button>
                </>
              )}
              {/*<p>*/}
              {/*  <strong>🚻 성별:</strong>{' '}*/}
              {/*  {userData.gender === 'male'*/}
              {/*    ? '남성'*/}
              {/*    : userData.gender === 'female'*/}
              {/*      ? '여성'*/}
              {/*      : '선택 안함'}*/}
              {/*</p>*/}
              {/*<p>*/}
              {/*  <strong>💬 한줄 소개:</strong> {userData.introduce}*/}
              {/*</p>*/}
              {/*{userData.snsLink && (*/}
              {/*  <p>*/}
              {/*    <strong>🔗 SNS:</strong>{' '}*/}
              {/*    <a*/}
              {/*      href={userData.snsLink}*/}
              {/*      target="_blank"*/}
              {/*      rel="noopener noreferrer"*/}
              {/*    >*/}
              {/*      {userData.snsLink}*/}
              {/*    </a>*/}
              {/*  </p>*/}
              {/*)}*/}
            </Card.Body>
          </Card>

          {/* 약관 동의 정보 */}
          <Card className="mt-3">
            <Card.Header>약관 동의 상태</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                14세 이상 동의: {user?.agreeOfTerm?.overFourteen ? '✅' : '❌'}
              </ListGroup.Item>
              <ListGroup.Item>
                이용 약관 동의: {user?.agreeOfTerm?.agreeOfTerm ? '✅' : '❌'}
              </ListGroup.Item>
              <ListGroup.Item>
                개인정보 동의:{' '}
                {user?.agreeOfTerm?.agreeOfPersonalInfo ? '✅' : '❌'}
              </ListGroup.Item>
              <ListGroup.Item>
                마케팅 동의: {user?.agreeOfTerm?.agreeOfMarketing ? '✅' : '❌'}
              </ListGroup.Item>
              <ListGroup.Item>
                이벤트 동의: {user?.agreeOfTerm?.agreeOfEvent ? '✅' : '❌'}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
//
// const Profile = () => {
//   const navigate = useNavigate();
//   // console.log(localStorage.getItem('token'));
//   const [userInfo, setUserInfo] = useState({});
//   const [userProfile, setUserProfile] = useState({});
//   const [newImage, setNewImage] = useState(null);
//
//   const formattedBirth = userProfile.birth
//     ? new Date(userProfile.birth).toISOString().split('T')[0]
//     : '';
//
//   const handleFileChange = (e) => {
//     setNewImage(e.target.files[0]);
//   };
//
//   const updateUserInfo = async (e) => {
//     e.preventDefault();
//
//     const config = {
//       Authorization: 'Bearer ' + localStorage.getItem('token'),
//     };
//
//     try {
//       const formData = {
//         ...userInfo,
//         profile: userProfile,
//       };
//       console.log(formData);
//
//       const { data, status } = await axios.put(
//         'http://localhost/api/v1/user',
//         formData,
//         config,
//       );
//
//       if (status === 200) {
//         console.log('Update Data', data);
//         console.log('Update Form Data', formData);
//         alert('프로필 업데이트 성공');
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//
//   const updateUserImage = async (e) => {
//     e.preventDefault();
//
//     const config = {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//         'Content-Type': 'multipart/form-data',
//       },
//     };
//
//     try {
//       const formData = new FormData();
//       formData.append('img', newImage);
//
//       console.log(formData);
//
//       const { data, status } = await axios.put(
//         'http://localhost/api/v1/user',
//         formData,
//         config,
//       );
//
//       if (status === 200) {
//         setUserInfo(data.body);
//         alert('프로필 업데이트 완료');
//       }
//
//       console.log('______________________________', data);
//       console.log(status);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//
//   useEffect(() => {
//     getUserInfo();
//
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//     }
//   }, []);
//
//   const getUserInfo = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       };
//
//       const { data, status } = await axios.get(
//         'http://localhost/api/v1/auth',
//         config,
//       );
//
//       if (status === 200) {
//         setUserInfo(data.body);
//         setUserProfile(data.body.profile);
//       }
//
//       console.log('User Profile', data.body.profile);
//
//       console.log('User Info', data.body);
//       console.log(status);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//
//   return (
//     <Container
//       className="mb-5"
//       style={{ maxWidth: '600px', marginTop: '50px' }}
//     >
//       <h3>Profile</h3>
//       <Row className="mt-5">
//         <Col md={5} className="text-center">
//           <Image
//             src={userInfo.profileImg}
//             alt={userInfo.username}
//             fluid
//             className="rounded shadow"
//             style={{ marginBottom: '33px' }}
//           />
//
//           <Form onSubmit={updateUserImage}>
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Control
//                 type="file"
//                 accept="image/png, image/jpg, image/jpeg"
//                 onChange={handleFileChange}
//               />
//             </Form.Group>
//
//             <Button
//               type="submit"
//               variant="outline-primary"
//               className="w-100"
//               disabled={!newImage}
//             >
//               이미지 업데이트
//             </Button>
//           </Form>
//         </Col>
//
//         <Col md={7}>
//           <Form onSubmit={updateUserInfo}>
//             <Form.Group controlId="formUsername" className="mb-3">
//               <Form.Label>이름</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 value={userInfo.username}
//                 onChange={(event) =>
//                   setUserInfo({ username: event.target.value })
//                 }
//               />
//             </Form.Group>
//
//             <Form.Group controlId="formEmail" className="mb-3">
//               <Form.Label>이메일</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={userInfo.email}
//                 disabled
//               />
//             </Form.Group>
//
//             <Form.Group controlId="formPhone" className="mb-3">
//               <Form.Label>휴대폰 번호</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone"
//                 value={userInfo.phone}
//                 disabled
//               />
//             </Form.Group>
//             {/*    </Form>*/}
//             {/*  </Col>*/}
//             {/*</Row>*/}
//
//             {/*<Row className={'mt-3'}>*/}
//             {/*  <Col md={12}>*/}
//             {/*    <Form>*/}
//             <Form.Group controlId="formBirth" className={'mb-3'}>
//               <Form.Label>생년월일</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="birth"
//                 value={formattedBirth}
//                 onChange={(event) =>
//                   setUserProfile((prevState) => ({
//                     ...prevState,
//                     birth: event.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//
//             <Form.Group controlId="formGender" className="mb-3">
//               <Form.Label>성별</Form.Label>
//             </Form.Group>
//
//             <Form.Group controlId="formIntroduce" className="mb-3">
//               <Form.Label>1줄 소개</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="introduce"
//                 value={userProfile.introduce}
//                 placeholder="짧은 글로 자신을 소개해보세요. (최대 50자)"
//                 onChange={(event) =>
//                   setUserProfile((prevState) => ({
//                     ...prevState,
//                     introduce: event.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//
//             <Form.Group controlId="formSnsLink" className="mb-3">
//               <Form.Label>SNS 링크</Form.Label>
//               <Form.Control
//                 type="url"
//                 name="snsLink"
//                 value={userProfile.snsLink}
//                 placeholder="https://www.example.com"
//                 onChange={(event) =>
//                   setUserProfile((prevState) => ({
//                     ...prevState,
//                     snsLink: event.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//
//             <Button type="submit" variant="primary" className="w-100">
//               프로필 저장
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };
//
// export default Profile;
