import React from 'react';
import { RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/authContext';
import router from './router';

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      {/*<Outlet />*/}
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
