import { PageParams, PageResult } from '@/types/global';
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

export const dictPage = (
  params: PageParams & {
    dictName?: string;
    dictCode?: string;
  },
): Promise<ResponseData<PageResult<Dict>>> => {
  return request.get('/dict/page', params);
};

export const saveDict = (data: Dict) => {
  return request.post('/dict/saveUpdate', data);
};

export const saveDictData = (data: DictItem) => {
  return request.post('/dict/saveUpdateData', data);
};

export const deleteDict = (id: number) => {
  return request.delete(`/dict/deleteDict/${id}`);
};

export const deleteDictData = (id: number) => {
  return request.delete(`/dict/deleteDictData/${id}`);
};

export const dictDataPage = (
  params: PageParams & {
    dictId: number;
    itemLabel: string;
  },
): Promise<ResponseData<PageResult<DictItem>>> => {
  return request.get('/dict/pageData', params);
};
