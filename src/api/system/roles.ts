import request, { ResponseData } from '@/utils/request';

export const listRoles = (data: any) => {
  return request.get('/system/roles', data);
};