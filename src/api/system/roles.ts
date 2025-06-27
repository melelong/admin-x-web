import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
  sort: number;
  dataScope: number;
  status: number;
  remark: string;
  isDeleted: number;
  createTime: string;
  updateTime: string;
}

export interface RoleMenuEdit {
  roleId: number;
  menuIds: number[];
}

export const listRoles = (data: {
  pageNum: number;
  pageSize: number;
}): Promise<ResponseData<PageResult<Role>>> => {
  return request.get('/system/roles', data);
};

export const rolePermissions = (roleId: number): Promise<ResponseData> => {
  return request.get(`/system/roles/permission/${roleId}`);
};

export const setRoleMenus = (data: RoleMenuEdit): Promise<ResponseData> => {
  return request.post('/system/roles/setRoleMenus', data);
};
