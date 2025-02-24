import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';
import { Login, PasswordChange, PasswordFind, SignUp } from './pages/Auth';
import ProtectRoute from './components/ProtectRoute';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
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
        ],
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },

  // {
  //   path: '/',
  //   element: <App />,
  //   errorElement: <NotFound />,
  //   children: [
  //     {
  //       index: true,
  //       path: '/',
  //       element: <ProductList />,
  //     },
  //     {
  //       path: '/product/:id',
  //       element: <ProductDetail />,
  //     },
  //     {
  //       path: '/movie',
  //       element: <MovieList />,
  //     },
  //     {
  //       path: '/movie/:id',
  //       element: <MovieDetail />,
  //     },

  //   ],
  // },
]);

export default router;
