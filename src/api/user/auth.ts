import request, { ResponseData } from '@/utils/request';

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister extends Partial<UserLogin> {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginResponse {
  token: string;
}

/** 用户注册 */
export const userRegister = (data: UserRegister) => {
  return request.post('/auth/register', data);
};

/** 账号登录 */
export const userLogin = (data: UserLogin): Promise<ResponseData<LoginResponse>> => {
  return request.post<LoginResponse>('/auth/login', data, { withToken: false });
};
