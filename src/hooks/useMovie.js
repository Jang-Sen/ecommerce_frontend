import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../constants/api';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGViZDk0ZmRhMzJlYzQyNzBhNmZmNmFmNjVmMjhhNyIsIm5iZiI6MTczNDMyMTI0OC42NDUsInN1YiI6IjY3NWZhNDYwZDZmNWU4NDU4YjhiNTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gUmfYe6Z_3BgLytSw5hCaTBw1CXKG6tRvB9rLTVQVWk';
const config = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  },
};

export const useMovieList = (
  { language, page } = { language: 'en-US', page: 1 },
) => {
  return useQuery({
    queryKey: ['movie', language, page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_ENDPOINTS.MOVIE.LIST}?language=${language}&page=${page}`,
        config,
      );

      console.log('Movie Data Results: ', data.results);
      console.log('Movie Data', data);

      return data;
    },
    retry: false,
  });
};

export const useMovieDetail = ({ id, language } = { language: 'en-US' }) => {
  return useQuery({
    queryKey: ['movie', id, language],
    queryFn: async () => {
      const { data } = await axios.get(
        API_ENDPOINTS.MOVIE.DETAIL.replace(':id', id),
        config,
      );

      console.log('Movie Detail Data: ', data);

      return data;
    },
  });
};
