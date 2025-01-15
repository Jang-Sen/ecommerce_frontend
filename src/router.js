import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import { Login, MovieDetail, MovieList, SignUp } from './pages';
import PasswordFind from './pages/PasswordFind';
import Profile from './pages/Profile';
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
        path: '/find/password',
        element: <PasswordFind />,
      },
      {
        path: '/change/password',
        element: <PasswordChange />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
