import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../constants/api';

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const loginWindow = window.open(
          API_ENDPOINTS.SOCIAL.GOOGLE,
          'Google Login',
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );
        const messageListener = (event) => {
          console.log(event);

          if (event.origin !== 'http://localhost') return;

          const { user, accessToken } = event.data;

          if (accessToken) {
            console.log(user);

            if (loginWindow) {
              loginWindow.close();
              resolve(user);
            }
          } else {
            reject(new Error('Google Login Fail.'));
          }

          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', user);
        };
        window.addEventListener('message', messageListener);

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener('message', messageListener);
            reject(new Error('Google login window closed'));
          }
        }, 500);
      });
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });
};

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const loginWindow = window.open(
          API_ENDPOINTS.SOCIAL.KAKAO,
          'Kakao Login',
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );
        const messageListener = (event) => {
          console.log(event);

          if (event.origin !== 'http://localhost') return;

          const { user, accessToken } = event.data;

          if (accessToken) {
            console.log(user);

            if (loginWindow) {
              loginWindow.close();
              resolve(user);
            }
          } else {
            reject(new Error('Kakao Login Fail.'));
          }

          console.log('Kakao Login: ', user);
        };
        window.addEventListener('message', messageListener);

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener('message', messageListener);
            reject(new Error('Kakao login window closed'));
          }
        }, 500);
      });
    },
    onError: (error) => {
      console.error('Kakao Login Error: ', error.response.data.message);
    },
  });
};

export const useNaverLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const loginWindow = window.open(
          API_ENDPOINTS.SOCIAL.NAVER,
          'Naver Login',
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );
        const messageListener = (event) => {
          console.log(event);

          if (event.origin !== 'http://localhost') return;

          const { user, accessToken } = event.data;

          if (accessToken) {
            console.log(user);

            if (loginWindow) {
              loginWindow.close();
              resolve(user);
            }
          } else {
            reject(new Error('Naver Login Fail.'));
          }

          console.log('Naver Login: ', user);
        };
        window.addEventListener('message', messageListener);

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener('message', messageListener);
            reject(new Error('Naver login window closed'));
          }
        }, 500);
      });
    },
    onError: (error) => {
      console.error('Naver Login Error: ', error.response.data.message);
    },
  });
};
