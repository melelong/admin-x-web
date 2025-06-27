import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

export interface CommentForm {
  articleId: number;
  content: string;
  replyToUserId?: number;
  parentId?: number;
}

export interface Comment {
  id: number;
  articleId: number;
  auditRemark: string;
  auditStatus: number;
  content: string;
  createTime: string;
  parentId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  isOwn: boolean;
  isComment?: boolean;
  replyTo: string;
  replies: Comment[];
}

export const saveComment = (data: CommentForm) => {
  return request.post('/comment/save', data);
};

export const pageComment = (data: {
  articleId: number;
  pageNum: number;
  pageSize: number;
}): Promise<ResponseData<PageResult<Comment>>> => {
  return request.get('/comment/page', data);
};
