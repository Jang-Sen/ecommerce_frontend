import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const result = await axios.get(
        'https://localhost/api/v1/product/all?sort=createdAt&order=ASC&page=1&take=20',
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
                src={
                  product.productImg === null
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEXw8fP6+/2Ai5Hz9PZ+h4/u8fLu7u96hIzn6evv8PZ5hYrl6e2Bh4x9iYx5iYvr7u/29fp3gofP1dXt8Ovv7fDc4+ff5eWGj5K7wseCi5OgrK+Yo6Wfo6l4h47b3uPZ2tyxubzJztKQm5+ssLJ6hITM1duiq7N4f4hc1vOXAAADqklEQVR4nO3ba3eiMBSF4UwSEkVR6HgBq71f/v8/nCDVKgSmKOOck7Xfr9NVeWQPqG3Fr9AT//sA/nkQ8g9C/kHIPwj5ByH/IOQfhPyDkH8Q8g9C/kHIPwj51yFUnLpMKPgEIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQjhz4sGP/afdTNhujDXJ1L1m6TQCDO/T2J7bdpuR72f3Fudw622+toKbXfblKQwEpPYPkxGV/dopxOawmgyk32PzHu0mq4wkeNx32NrZggLZ8m876E1MxD6gvD2Qndfb/+nQIStxlCESqxGyvsIYQij6ElaK599DxGA0H1f9ZJJ12fueYwAhGah8my3k9K9BPVQAhBGZvwiq+InJepXnDCEyUH4qlSIQnF6Dhs3jQCE7nheZ7oohdld80FCEBoxX8d74H2Y19Ky1Uvs2kSeT64CERrxmD8vA35NU15eVMuHMRyFvimKeeQm6nv1zUy4WCgV9fv0k5nQqLtN85bXGTOhunubbVSvT/s5Cd1E37XW9kOZjqGa2v9GTkI30f3H2HbT9a2MOJ8xJ6GbqJZaFnLXNdT0IU/Fya2fjbCaaPUCuxxq2xVVLQv3Rpij0E00+QLKrqGu1lJn+cndn4nQlBM9vAt0S5Xxh3uvWx/qQqTLJHEvwrNcHVfMQ1hO1B7O4L7CM9RFOdHqq+L8eLnhIXRnUOozoX+oq3X1PlFKe/xQioPQje/9TTaqDbU8g+vvZ8CWV1QmwnKin7opPL+inkxUHobKReiuolMPsDHU74kehpqyELqr6Hvi8Z0PdT/R+pdVQ6UubF5FfUNtTPRkqNSFbqKxbhceh1qfaFV56yctTKbuDMZtvO+h+ia6b1cSI8LCWHdNdF/hhirUxDPRryfA3fopC6W7inYL3VCz16X0TfTrNOYpYWEiW6+iZ+ep80nI8oKycIhi0udwkCCEEMJLhUKMghfOp6ELo/tsEKHdkv0t6Ml2Gg8Q4d/zFioaD1DPH+XcUhgZ4y6pVzaP6j/JICQUQ/xJie9n+38NfxUEIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD0II6QchhPSDEEL6QQgh/SCEkH4QsheaC4WcukgYSBDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyD0L+Qcg/CPkXvvAP0S+Ye31pd4gAAAAASUVORK5CYII='
                    : product.productImg
                }
                style={{ height: '250px' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description.slice(0, 10)} ...</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary">Go somewhere</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
