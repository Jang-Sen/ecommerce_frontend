import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = () => {
  // const accessToken = Cookies.get('accessToken');
  const { user } = useAuth();
  const location = useLocation(); // 🔥 현재 페이지 확인

  if (
    user &&
    (location.pathname === '/login' || location.pathname === '/signup')
  ) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;

  // 🔥 로그인 상태일 때만 /profile로 리디렉트 (다른 페이지 이동은 허용)
  // return user && location.pathname === '/login' ? (
  //   <Navigate to={'/profile'} replace />
  // ) : (
  //   <Outlet />
  // );
};

export default PublicRoute;
