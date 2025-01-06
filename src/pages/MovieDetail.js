import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const params = useParams();

  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
      const options = {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGViZDk0ZmRhMzJlYzQyNzBhNmZmNmFmNjVmMjhhNyIsIm5iZiI6MTczNDMyMTI0OC42NDUsInN1YiI6IjY3NWZhNDYwZDZmNWU4NDU4YjhiNTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUmfYe6Z_3BgLytSw5hCaTBw1CXKG6tRvB9rLTVQVWk',
        },
      };
      const result = await axios.get(url, options);

      console.log(result.data);
      setMovie(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return <div>{movie.original_title}</div>;
};

export default MovieDetail;
