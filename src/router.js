import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';
import { Login, PasswordChange, PasswordFind, SignUp } from './pages/Auth';
import ProtectRoute from './components/ProtectRoute';
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

const router = createBrowserRouter(
  [
    {
      element: <Layout />, // ✅ HeadBar 포함된 공통 레이아웃
      children: [
        {
          element: <PublicRoute />,
          children: [
            { path: '/', element: <SignUp /> },
            { path: '/login', element: <Login /> },
            { path: '/forgot-password', element: <PasswordFind /> },
            { path: '/change-password', element: <PasswordChange /> },
          ],
        },
        {
          element: <ProtectRoute />,
          children: [
            { path: '/product', element: <ProductList /> }, // ✅ Members 페이지 추가
            { path: '/profile', element: <Profile /> },
            { path: '/product/:id', element: <ProductDetail /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         element: <PublicRoute />,
//         children: [
//           {
//             path: '/',
//             element: <Main />,
//           },
//           {
//             path: '/login',
//             element: <Login />,
//           },
//           {
//             path: '/signup',
//             element: <SignUp />,
//           },
//           {
//             path: '/find/password',
//             element: <PasswordFind />,
//           },
//           {
//             path: '/change/password',
//             element: <PasswordChange />,
//           },
//         ],
//       },
//       {
//         element: <ProtectRoute />,
//         children: [
//           {
//             path: '/product',
//             element: <ProductList />,
//           },
//           {
//             path: '/profile',
//             element: <Profile />,
//           },
//         ],
//       },
//     ],
//   },

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
// ]);

export default router;
