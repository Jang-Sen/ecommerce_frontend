import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost/api/v1/product/${params.id}`,
      );
      console.log(response.data.body);
      setProduct(response.data.body);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, [params]);
  return (
    <Container className={'mt-3'}>
      <Row>{product.name}</Row>
    </Container>
  );
};

export default ProductDetail;
