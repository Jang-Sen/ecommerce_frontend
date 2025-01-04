import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/movie',
        element: <MovieList />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetail />,
      },
    ],
  },
]);

export default router;
