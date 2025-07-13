import request, { ResponseData } from '@/utils/request';
import { Menu } from '@/types/meun';

export const saveMenu = (data: Menu) => {
  return request.post('/menu/save', data);
};

export const menuTree = (): Promise<ResponseData<Menu[]>> => {
  return request.get('/menu/tree');
};
