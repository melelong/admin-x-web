import request from '@/utils/request';

export type Log = object;

export const logList = (params: { page: number; size: number }): Promise<any> => {
  return request.get('/logs', params);
};
