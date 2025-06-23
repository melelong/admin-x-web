import { defineStore } from 'pinia';

import { User } from '@/api/user';
import { userInfo } from '@/api/user';

export const useUserStore = defineStore('user', () => {

  const token = localStorage.getItem('token');
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => !!token);

  /**
   * 退出登录
   */
  const logout = () => {
    user.value = null;
    localStorage.removeItem('token');
  };

  /**
   * 设置 Token
   * @param token
   */
  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    const res = await userInfo();
    user.value = res.data;
  };

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    logout,
    getUserInfo,
  };
});
