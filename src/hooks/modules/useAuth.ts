import { userLogin, type UserLogin } from '@/api/user';
import router from '@/router';

export const useAuth = () => {

  /** 账号登录 */
  const accountLogin = async (data: UserLogin) => {
    await userLogin(data);
  };

  /** 退出登录 */
  const signOut = async () => {
    await router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    });
    window.location.reload();
  };

  return {
    accountLogin,
    signOut,
  };
};