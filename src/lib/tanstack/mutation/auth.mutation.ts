import { useMutation } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseClient';
import { loginWithGoogleApi, logoutApi } from '@/services/auth.api';

export const useLogin = () => {
  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();
      await loginWithGoogleApi(idToken);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await logoutApi();
      await signOut(auth);
    },
  });
};
