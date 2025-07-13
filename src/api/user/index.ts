import { PageParams, PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';
import { Menu } from '@/types/meun';

export interface User {
  userId: number;
  deptId: number;
  username: string;
  nickname: string;
  avatar: string;
  gender: number;
}

export interface PermissionData {
  menus: Menu[];
  permissions: string[];
}

export interface UpdateUser extends Omit<User, 'deptId'> {
  roleIds: number[];
}

export const userPage = (data: PageParams): Promise<ResponseData<PageResult<User>>> => {
  return request.get('/user/page', data);
};

export const userInfo = (): Promise<ResponseData<User>> => {
  return request.get('/user/getUserInfo');
};

export const fetchPermissions = (): Promise<ResponseData<PermissionData>> => {
  return request.get('/user/permissions');
};

export const updateUser = (data: UpdateUser) => {
  return request.post('/user/updateUser', data);
};
