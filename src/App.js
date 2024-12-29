import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const App = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const result = await axios.get(
        'https://localhost/api/v1/product/all?sort=createdAt&order=ASC&page=1&take=10',
      );

      setProducts(result.data.body.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container className={'mt-3'}>
      <Row>
        {products?.map((product) => (
          <Col className={'mt-3'}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={product.productImg}
                style={{ height: '250px' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description.slice(0, 10)} ...</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
