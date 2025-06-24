import { defineStore } from 'pinia';

import { User } from '@/api/user';
import { userInfo } from '@/api/user';

export const useUserStore = defineStore('user', () => {

  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<User | null>(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  /**
   * 退出登录
   */
  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  /**
   * 设置 Token
   * @param newToken
   */
  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    if (!token.value) return false;
    try {
      loading.value = true;
      const res = await userInfo();
      user.value = res.data;
      return true;
    } catch (error) {
      logout();
      return false;
    } finally {
      loading.value = false;
    }
  };

  const init = async () => {
    if (token.value && !user.value) {
      await getUserInfo();
    }
  };

  init().finally();

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    logout,
    getUserInfo,
  };
});
