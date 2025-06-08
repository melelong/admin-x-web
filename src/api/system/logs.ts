import request from '@/utils/request';

export interface Log {

}

export const logList = (params: { pageNum: number, pageSize: number }): Promise<any> => {
  return request.get('/logs', params);
};