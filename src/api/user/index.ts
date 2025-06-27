import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export * from './auth';

export interface User {
  userId: number;
  deptId: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  age: number;
  name: string;
  gender: number;
}

export const listUser = (data: {
  pageNum: number;
  pageSize: number;
}): Promise<ResponseData<PageResult<User>>> => {
  return request.get('/user/listUser', data);
};

export const userInfo = (): Promise<ResponseData<User>> => {
  return request.get('/user/getUserInfo');
};
