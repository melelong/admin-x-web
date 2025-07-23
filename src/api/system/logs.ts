import request from '@/utils/request';
import { PageParams } from '@/types/global';

export interface Log {
  operator: string;
  description: string;
  module: string;
  type: string;
  ip: string;
  requestMethod: string;
  operationTime: string;
}

export const logPage = (params: PageParams): Promise<any> => {
  return request.get('/log/page', params);
};

export const moduleStats = (): Promise<any> => {
  return request.get('/log/modules');
};

export const dailyStats = (): Promise<any> => {
  return request.get('/log/daily');
};
