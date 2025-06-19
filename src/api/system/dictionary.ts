import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface Dict {
  id: number;
  dictName: string;
  dictCode: string;
  remark: string;
  status: number;
}

export interface DictItem {
  id: number;
  dictId: number;
  itemLabel: string;
  itemValue: string;
  sort: number;
  status: number;
}

export const dictPage = (params: {
  pageNum: number;
  pageSize: number;
  dictName?: string;
  dictCode?: string
}): Promise<ResponseData<PageResult<Dict>>> => {
  return request.get('/dict/page', params);
};

export const saveDict = (data: Dict) => {
  return request.post('/dict/save', data);
};

export const dictDataPage = (params: {
  pageNum: number;
  pageSize: number;
  dictId: number;
  itemLabel: string;
}): Promise<ResponseData<PageResult<DictItem>>> => {
  return request.get('/dict/pageData', params);
};