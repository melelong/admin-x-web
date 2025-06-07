export const useUserStore = () => {

  const token = localStorage.getItem("token");

  /**
   * 退出登录
   */
  const logout = () => {
    localStorage.removeItem('token');
  };

  /**
   * 设置 Token
   * @param token
   */
  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  return {
    token,
    setToken,
    logout,
  };
};
