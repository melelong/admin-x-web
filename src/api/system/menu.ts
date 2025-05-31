import request from '@/utils/request';

export const saveMenu = (data: any) => {
  return request.post('/api/menu', data);
};
