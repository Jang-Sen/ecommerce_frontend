import React from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';

const Main = () => {
  const imageStyle = {
    width: '100%',
    height: '700px',
    objectFit: 'cover',
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/first_slide.jpg"
                alt="First slide"
                style={imageStyle}
              />
              <Carousel.Caption>
                <h3>기가막힌 연동성.</h3>
                <h5>여러개의 애플 제품 이용 시 간편한 사용 가능.</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/second_silde.jpg"
                alt="Second slide"
                style={imageStyle}
              />
              <Carousel.Caption className={'text-black'}>
                <h3>꿈꾸던 그 모든 것, Mac과 함께 현실로.</h3>
                <h5>당신의 정보는 오롯이 당신만의 것.</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/third_silde.jpg"
                alt="Third slide"
                style={imageStyle}
              />
              <Carousel.Caption>
                <h3>사랑받기 위해 디자인되다.</h3>
                <h5>인생 사진과 인생 비디오를 마음껏.</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="product1.jpg" />
            <Card.Body>
              <Card.Title>Product 1</Card.Title>
              <Card.Text>Description of product 1.</Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="product2.jpg" />
            <Card.Body>
              <Card.Title>Product 2</Card.Title>
              <Card.Text>Description of product 2.</Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="product3.jpg" />
            <Card.Body>
              <Card.Title>Product 3</Card.Title>
              <Card.Text>Description of product 3.</Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
