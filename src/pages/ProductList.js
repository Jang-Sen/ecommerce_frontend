import React, { useState } from 'react';
import { useProductList } from '../hooks/useProduct';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
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

  // 페이지네이션 그룹 (10개씩 표시)
  const [currentGroup, setCurrentGroup] = useState(1);
  const itemsPerPage = 10; // 한 번에 보여줄 페이지 버튼 개수

  const totalGroups = Math.ceil(pageCount / itemsPerPage);
  const startPage = (currentGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, pageCount);

  // console.log('@@@@@@@@@@', products?.meta?.pageCount);

  // Handler
  // 데이터 보기 개수 변경 핸들러
  const takeChangeHandler = (event) => {
    const value = Number(event.target.value);
    setTake(value);
    setPage(1);
    // console.log('선택한 숫자:', value);
  };

  // 페이지 변경 핸들러
  const pageChangeHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  // 페이지 그룹 변경 핸들러
  const prevGroupHandler = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const nextGroupHandler = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
    }
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
          <Col key={product.id} className={'mt-3'}>
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
        {/* 이전 페이지 그룹 버튼 */}
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={prevGroupHandler}
          disabled={currentGroup === 1}
        >
          {'<'}
        </Button>

        {/* 페이지 버튼 (10개씩) */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((num) => (
          <Button
            key={num}
            variant={num === page ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => pageChangeHandler(num)}
          >
            {num}
          </Button>
        ))}

        {/* 다음 페이지 그룹 버튼 */}
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={nextGroupHandler}
          disabled={currentGroup === totalGroups}
        >
          {'>'}
        </Button>
      </div>
    </Container>
  );
};
export default ProductList;
