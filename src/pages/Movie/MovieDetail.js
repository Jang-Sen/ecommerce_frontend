import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useMovieDetail } from '../../hooks/useMovie';

const MovieDetail = () => {
  // param
  const params = useParams();

  const [language, setLanguage] = useState('en-US');

  const { data: movie } = useMovieDetail({ id: params.id, language });
  //
  // const [movie, setMovie] = useState({});
  //
  // const getMovie = async () => {
  //   try {
  //     const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
  //     const options = {
  //       headers: {
  //         accept: 'application/json',
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGViZDk0ZmRhMzJlYzQyNzBhNmZmNmFmNjVmMjhhNyIsIm5iZiI6MTczNDMyMTI0OC42NDUsInN1YiI6IjY3NWZhNDYwZDZmNWU4NDU4YjhiNTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUmfYe6Z_3BgLytSw5hCaTBw1CXKG6tRvB9rLTVQVWk',
  //       },
  //     };
  //     const result = await axios.get(url, options);
  //
  //     console.log(result.data);
  //     setMovie(result.data);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  return (
    <Container className={'mt-5'}>
      <Row>
        <Col md={5}>
          <Image
            src={`https://image.tmdb.org/t/p/w500` + movie?.poster_path}
            alt={movie?.id}
            fluid
            className="rounded shadow"
          />
        </Col>

        <Col md={6}>
          <h2>{movie?.title}</h2>
          <strong>{movie?.status}</strong>
          <p>
            <strong>Run Time:</strong> {movie?.runtime} M
          </p>
          <p className="text-muted">{movie?.popularity}</p>
          <p className="text-muted">{movie?.release_date}</p>
          <h5>Over View</h5>
          <p>{movie?.overview}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
