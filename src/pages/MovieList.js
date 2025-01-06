import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const url =
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
      const options = {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGViZDk0ZmRhMzJlYzQyNzBhNmZmNmFmNjVmMjhhNyIsIm5iZiI6MTczNDMyMTI0OC42NDUsInN1YiI6IjY3NWZhNDYwZDZmNWU4NDU4YjhiNTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUmfYe6Z_3BgLytSw5hCaTBw1CXKG6tRvB9rLTVQVWk',
        },
      };

      const result = await axios.get(url, options);

      console.log(result.data);
      setMovies(result.data.results);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const path = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      {movies?.map((movie) => (
        <Col className={'mt-3'}>
          <Card style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={path + movie.poster_path}
              style={{ height: '250px' }}
            ></Card.Img>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview.slice(0, 20)}...</Card.Text>
              <Link to={`/movie/${movie.id}`}>
                <Button variant="primary">Go Detail</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default MovieList;
