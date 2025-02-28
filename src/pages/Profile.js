import React, { useState } from 'react';
import { useProductList } from '../hooks/useProduct';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Value
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  // Mutation
  const {
    data: products,
    error,
    isError,
    isPending,
  } = useProductList({ page, take });

  const pageCount = products?.meta?.pageCount || 1;

  // Handler
  const takeChangeHandler = (event) => {
    const value = Number(event.target.value);
    setTake(value);
    setPage(1);
  };

  const pageChangeHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Container className="mt-3">
      {/* Take 설정 */}
      <div className="d-flex justify-content-end mb-2">
        <select
          id="numberSelect"
          value={take}
          onChange={takeChangeHandler}
          className="form-select w-auto"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label htmlFor="numberSelect" className="me-2 fw-bold mt-1">
          &nbsp;개씩 보기
        </label>
      </div>

      {isPending && <p>Data Loading..</p>}

      <Row>
        {products?.data?.map((product, index) => (
          <Col className={'mt-3'}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={
                  product.productImg === null
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEXw8fP6+/2Ai5Hz9PZ+h4/u8fLu7u96hIzn6evv8PZ5hYrl6e2Bh4x9iYx5iYvr7u/29fp3gofP1dXt8Ovv7fDc4+ff5eWGj5K7wseCi5OgrK+Yo6Wfo6l4h47b3uPZ2tyxubzJztKQm5+ssLJ6hITM1duiq7N4f4hc1vOXAAADqklEQVR4nO3ba3eiMBSF4UwSEkVR6HgBq71f/v8/nCDVKgSmKOOck7Xfr9NVeWQPqG3Fr9AT//sA/nkQ8g9C/kHIPwj5ByH/IOQfhPyDkH8Q8g9C/kHIPwj51yFUnLpMKPgEIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQjhz4sGP/afdTNhujDXJ1L1m6TQCDO/T2J7bdpuR72f3Fudw622+toKbXfblKQwEpPYPkxGV/dopxOawmgyk32PzHu0mq4wkeNx32NrZggLZ8m876E1MxD6gvD2Qndfb/+nQIStxlCESqxGyvsIYQij6ElaK599DxGA0H1f9ZJJ12fueYwAhGah8my3k9K9BPVQAhBGZvwiq+InJepXnDCEyUH4qlSIQnF6Dhs3jQCE7nheZ7oohdld80FCEBoxX8d74H2Y19Ky1Uvs2kSeT64CERrxmD8vA35NU15eVMuHMRyFvimKeeQm6nv1zUy4WCgV9fv0k5nQqLtN85bXGTOhunubbVSvT/s5Cd1E37XW9kOZjqGa2v9GTkI30f3H2HbT9a2MOJ8xJ6GbqJZaFnLXNdT0IU/Fya2fjbCaaPUCuxxq2xVVLQv3Rpij0E00+QLKrqGu1lJn+cndn4nQlBM9vAt0S5Xxh3uvWx/qQqTLJHEvwrNcHVfMQ1hO1B7O4L7CM9RFOdHqq+L8eLnhIXRnUOozoX+oq3X1PlFKe/xQioPQje/9TTaqDbU8g+vvZ8CWV1QmwnKin7opPL+inkxUHobKReiuolMPsDHU74kehpqyELqr6Hvi8Z0PdT/R+pdVQ6UubF5FfUNtTPRkqNSFbqKxbhceh1qfaFV56yctTKbuDMZtvO+h+ia6b1cSI8LCWHdNdF/hhirUxDPRryfA3fopC6W7inYL3VCz16X0TfTrNOYpYWEiW6+iZ+ep80nI8oKycIhi0udwkCCEEMJLhUKMghfOp6ELo/tsEKHdkv0t6Ml2Gg8Q4d/zFioaD1DPH+XcUhgZ4y6pVzaP6j/JICQUQ/xJie9n+38NfxUEIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQgh/SCEkH4QsheaC4WcukgYSBDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyD0L+Qcg/CPkXvvAP0S+Ye31pd4gAAAAASUVORK5CYII='
                    : product.productImg
                }
                style={{
                  height: '250px',
                  objectFit: 'contain',
                  width: '100%',
                }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description.length > 20
                    ? product.description.slice(0, 20) + '...'
                    : product.description}
                </Card.Text>
                <Card.Text>$ {product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary">Go Detail</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant={num === page ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => pageChangeHandler(num)}
          >
            {num}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Profile;

// const Profile = () => {
//   const { data: user, error, isError, isPending } = useUserInfo();
//
//   const { logout } = useAuth();
//   const queryClient = useQueryClient();
//
//   const navigate = useNavigate();
//
//   const logoutHandler = () => {
//     logout();
//     queryClient.removeQueries(['user']);
//     navigate('/login');
//   };
//
//   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', user);
//   return (
//     <Container className="mb-5">
//       <Row>
//         <Col />
//         <Col xs={6}>{user?.email}</Col>
//         <Col />
//
//         <Button variant="primary" className="w-100" onClick={logoutHandler}>
//           로그아웃
//         </Button>
//       </Row>
//     </Container>
//   );
// };
//
// export default Profile;

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
