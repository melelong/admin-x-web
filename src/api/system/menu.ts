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
  children: Menu[];
}

export const saveMenu = (data: Menu) => {
  return request.post('/menu/save', data);
};

export const menuTree = (): Promise<ResponseData<Menu[]>> => {
  return request.get('/menu/tree');
};