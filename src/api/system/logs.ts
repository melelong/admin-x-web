import request from '@/utils/request';

export interface Log {

}

export const logList = (params: { page: number, size: number }): Promise<any> => {
  return request.get('/logs', params);
};