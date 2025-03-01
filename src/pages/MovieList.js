import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMovieList } from '../hooks/useMovie';

const MovieList = () => {
  // const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState('en-US');
  const [page, setPage] = useState(1);
  const { data: movies, isPending } = useMovieList({ language, page });

  const path = 'https://image.tmdb.org/t/p/w500';
  const pageCount = movies?.total_pages || 1;

  // 페이지네이션 그룹 (10개씩 표시)
  const [currentGroup, setCurrentGroup] = useState(1);
  const itemsPerPage = 10; // 한 번에 보여줄 페이지 버튼 개수

  const totalGroups = Math.ceil(pageCount / itemsPerPage);
  const startPage = (currentGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, pageCount);

  // Handler
  // 페이지 변경 핸들러
  const pageChangeHandler = (pageNum) => {
    setPage(pageNum);
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

  // const getMovies = async () => {
  // try {
  //   const url =
  //     'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  //   const options = {
  //     headers: {
  //       accept: 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGViZDk0ZmRhMzJlYzQyNzBhNmZmNmFmNjVmMjhhNyIsIm5iZiI6MTczNDMyMTI0OC42NDUsInN1YiI6IjY3NWZhNDYwZDZmNWU4NDU4YjhiNTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUmfYe6Z_3BgLytSw5hCaTBw1CXKG6tRvB9rLTVQVWk',
  //     },
  //   };
  //
  //   const result = await axios.get(url, options);
  //
  //   console.log(result.data);
  //   setMovies(result.data.results);
  // } catch (e) {
  //   console.log(e.message);
  // }
  // };

  // useEffect(() => {
  //   getMovies();
  // }, []);

  return (
    <Container className={'mt-3'}>
      {isPending && <p>Data Loading...</p>}

      <Row>
        {movies?.results?.map((movie) => (
          <Col key={movie.id} className={'mt-3'}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={path + movie.poster_path}
                style={{
                  height: '250px',
                  objectFit: 'contain',
                  width: '100%',
                }}
              ></Card.Img>

              <Card.Body>
                <Card.Title>
                  {movie.title.length > 20
                    ? movie.title.slice(0, 20) + '...'
                    : movie.title}
                </Card.Title>

                <Card.Text>
                  {movie.overview
                    ? movie.overview.slice(0, 50) + '...'
                    : 'No Description.'}
                </Card.Text>

                <Link to={`/movie/${movie.id}`}>
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

export default MovieList;
