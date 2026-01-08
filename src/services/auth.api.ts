import api from '@/lib/axios';

export const loginWithGoogleApi = (idToken: string) => {
  return api.post(
    '/api/v1/auth/login',
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
};

export const logoutApi = () => {
  return api.post('/api/v1/auth/logout');
};
