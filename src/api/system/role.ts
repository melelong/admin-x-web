import { PageParams, PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
  sort: number;
  dataScope: number;
  status: number;
  remark: string;
  createTime: string;
  updateTime: string;
}

export interface RoleMenuEdit {
  roleId: number;
  menuIds: number[];
}

export const rolePage = (data: PageParams): Promise<ResponseData<PageResult<Role>>> => {
  return request.get('/role/page', data);
};

export const rolePermissions = (roleId: number): Promise<ResponseData> => {
  return request.get(`/role/permission/${roleId}`);
};

export const setRoleMenus = (data: RoleMenuEdit): Promise<ResponseData> => {
  return request.post('/role/setRoleMenus', data);
};
