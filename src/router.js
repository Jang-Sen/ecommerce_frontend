import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import { Login, MovieDetail, MovieList, SignUp } from './pages';
import PasswordChange from './pages/PasswordChange';

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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/password',
        element: <PasswordChange />,
      },
    ],
  },
]);

export default router;
