import { PageParams, PageResult } from '@/types/global';
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
  content: string;
  createTime: string;
  parentId: number;
  userId: number;
  nickName: string;
  userAvatar: string;
  isOwn: boolean;
  isComment?: boolean;
  replyTo: string;
  replies: Comment[];
}

export const saveComment = (data: CommentForm) => {
  return request.post('/comment/save', data);
};

export const pageComment = (
  data: PageParams & { articleId: number },
): Promise<ResponseData<PageResult<Comment>>> => {
  return request.get('/comment/page', data);
};
