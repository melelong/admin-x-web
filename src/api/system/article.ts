import { PageResult } from '@/types/global';
import request, { ResponseData } from '@/utils/request';

/**
 * 文章/评论审核状态枚举
 */
export enum AuditStatus {
  /** 0: 待审核 */
  PENDING = 0,
  /** 1: 审核通过 */
  APPROVED = 1,
  /** 2: 审核拒绝 */
  REJECTED = 2
}

/**
 * 文章互动类型
 */
export enum InteractionType {
  /** like: 点赞 */
  LIKE = 'like',
  /** favorite: 收藏 */
  FAVORITE = 'favorite'
}

export interface Article {
  articleId: number;
  title: string;
  content: string;
  categoryId: string;
  categoryName: string;
  nickname: string;
  avatar: string;
  userId: number;
  status: number;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  auditStatus: number;
  auditRemark: number;
  createTime: string;
  isLiked: boolean;
  isFavorite: boolean;
}

export interface ArticleCategory {
  categoryId: number;
  categoryName: string;
}

export const saveArticle = (data: Article) => {
  return request.post('/article/save', data);
};

export const pageArticle = (data: {
  pageNum: number;
  pageSize: number;
  title: string;
}): Promise<ResponseData<PageResult<Article>>> => {
  return request.get('/article/page', data);
};

export const delArticle = (id: number) => {
  return request.delete(`/article/del/${id}`);
};

export const detailArticle = (id: string): Promise<ResponseData<Article>> => {
  return request.get(`/article/${id}`);
};

export const saveArticleCategory = (data: ArticleCategory) => {
  return request.post('/article/category/save', data);
};

export const pageArticleCategory = (data: {
  pageNum: number;
  pageSize: number;
  keyword: string;
}): Promise<ResponseData<PageResult<ArticleCategory>>> => {
  return request.get('/article/category/page', data);
};

export const delArticleCategory = (id: number) => {
  return request.delete(`/article/category/del/${id}`);
};

export const allCategory = (): Promise<ResponseData<ArticleCategory[]>> => {
  return request.get('/article/category/all');
};

export const toggleInteraction = (data: {
  articleId: number,
  type: string,
}): Promise<ResponseData<string>> => {
  return request.post('/interaction/toggle', data);
};

