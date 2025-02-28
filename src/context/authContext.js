import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '../constants/api';
import axiosInstanse from '../api/apiInstanse';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // 🔥 무한 실행 방지
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const refreshAccessToken = async () => {
    if (isRefreshing) return; // 🔥 이미 refreshToken 요청 중이면 실행 안 함

    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      setIsRefreshing(true);
      const { data } = await axiosInstanse.post(
        API_ENDPOINTS.AUTH.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      Cookies.set('accessToken', data.accessToken, {
        expires: 1,
        secure: true,
      });
      setUser({ token: data.accessToken });
    } catch (error) {
      console.error('Refresh token failed. Logging out...');
      logout();
    } finally {
      setIsRefreshing(false); // 🔥 요청이 끝나면 다시 실행 가능
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      refreshAccessToken(); // 🔥 accessToken이 없을 때만 실행
    } else {
      setUser({ token: accessToken });
    }

    setLoading(false); // 로딩 완료
  }, []); // 🔥 `isRefreshing`을 의존성 배열에서 제거하여 무한 실행 방지

  if (loading) {
    return <div>Loading...</div>; // 초기 로딩 상태 표시
  }

  const login = (token) => {
    Cookies.set('accessToken', token, { expires: 1, secure: true });
    setUser({ token });
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('Authentication');
    Cookies.remove('Refresh');
    setUser(null); // ✅ user 상태를 즉시 null로 변경
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// import { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
//
// const AuthContext = createContext(undefined);
//
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//
//   useEffect(() => {
//     const accessToken = Cookies.get('accessToken');
//
//     setUser({ token: accessToken });
//   }, []);
//
//   const login = (token) => {
//     Cookies.set('accessToken', token);
//     setUser({ token });
//   };
//
//   const logout = () => {
//     Cookies.remove('accessToken');
//     setUser(null);
//   };
//
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//
//   if (!context) {
//     throw new Error('useAuth Error');
//   }
//
//   return context;
// };
