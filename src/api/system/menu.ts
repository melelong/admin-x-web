import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface Menu {
  id?: number;
  parentId?: number;
  name: string;
  title: string;
  path: string;
  component: string;
  icon?: string;
  cache?: boolean;
  visible?: boolean;
  redirect?: string;
  menuType: number;
  permission: string;
  sortOrder: number;
  status?: number;
}

export const saveMenu = (data: Menu) => {
  return request.post('/menu/save', data);
};

export const menuList = (params: { pageNum: number, pageSize: number }): Promise<ResponseData<PageResult<Menu>>> => {
  return request.get('/menu/list', params);
};