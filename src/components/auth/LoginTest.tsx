import { useLogin } from '@/lib/tanstack/mutation/auth.mutation';

export const LoginTest = () => {
  const { mutate: login, isPending } = useLogin();

  return (
    <button onClick={() => login()} disabled={isPending}>
      Google 로그인
    </button>
  );
};
