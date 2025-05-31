import request from '@/utils/request';

export const userRegister = (data: any) => {
  return request.post('/api/auth/register', data);
};
