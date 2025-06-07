import { message } from 'ant-design-vue';

import { userLogin, type UserLogin } from '@/api/user';
import { t } from '@/i18n';
import router from '@/router';
import { useUserStore } from '@/store';

const userStore = useUserStore();

export const useAuth = () => {

  /** 账号登录 */
  const accountLogin = async (data: UserLogin) => {
    const res = await userLogin(data);
    userStore.setToken(res.data.token);
    await router.replace({ name: 'Home' });
    message.success(t('登录成功'));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  /** 退出登录 */
  const signOut = async () => {
    userStore.logout();
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