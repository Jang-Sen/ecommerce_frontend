import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = () => {
  // const accessToken = Cookies.get('accessToken');
  const { user } = useAuth();

  return user ? <Navigate to={'/profile'} replace /> : <Outlet />;
};

export default PublicRoute;
