import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
  sort: number;
  dataScope: number;
  status: number;  // 0-正常 1-停用
  remark: string;
  isDeleted: number;  // 0-未删除 1-已删除
  createTime: string;  // ISO 8601格式日期
  updateTime: string;
}

export const listRoles = (data: { pageNum: number, pageSize: number }): Promise<ResponseData<PageResult<Role>>> => {
  return request.get('/system/roles', data);
};