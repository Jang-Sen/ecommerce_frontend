import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProduct';

const ProductDetail = () => {
  const params = useParams();

  const {
    data: product,
    error,
    isError,
    isPending,
  } = useProductDetail(params.id);
  return <div>{product?.name}</div>;
};

export default ProductDetail;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Col, Container, Image, Row } from 'react-bootstrap';
//
// const ProductDetail = () => {
//   const params = useParams();
//   const [product, setProduct] = useState({});
//
//   const getProduct = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost/api/v1/product/${params.id}`,
//       );
//       console.log(response.data.body);
//       setProduct(response.data.body);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   useEffect(() => {
//     getProduct();
//   }, [params]);
//   return (
//     <Container className={'mt-5'}>
//       <Row>
//         <Col md={5}>
//           <Image
//             src={product.productImg}
//             alt={product.name}
//             fluid
//             className="rounded shadow"
//           />
//         </Col>
//
//         <Col md={6}>
//           <h2>{product.name}</h2>
//           <p className="text-muted">{product.category}</p>
//           <h5 className="text-muted">{`$ ${product.price}`}</h5>
//           <p>{product.description}</p>
//         </Col>
//       </Row>
//     </Container>
//   );
// };
//
// export default ProductDetail;
