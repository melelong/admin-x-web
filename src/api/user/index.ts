import request from '@/utils/request';

export interface UserLogin {
  username: string;
  password: string;
}

/** 用户注册 */
export const userRegister = (data: any) => {
  return request.post('/api/auth/register', data);
};

/** 账号登录 */
export const userLogin = (data: UserLogin) => {
  return request.post<UserLogin>('/api/auth/login', data);
};