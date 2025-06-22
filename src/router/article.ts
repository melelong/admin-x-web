import { PartitionOutlined } from '@ant-design/icons-vue';

import { t } from '@/i18n';
import Layout from '@/layout/Layout.vue';
export const articleList = [
  {
    path: '/article',
    name: 'Article',
    redirect: '/article/manage',
    meta: { title: t('🍃文章管理'), icon: PartitionOutlined },
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'ArticleManage',
        component: () => import('@/views/article/manage/index.vue'),
        meta: { title: t('🌹文章管理') },
      },
      {
        path: 'category',
        name: 'ArticleCategory',
        component: () => import('@/views/article/category/index.vue'),
        meta: { title: t('🍭分类管理') },
      },
      {
        path: 'audit',
        name: 'ArticleAudit',
        component: () => import('@/views/article/audit/index.vue'),
        meta: { title: t('🍀评论审核') },
      },
      {
        path: 'detail/:articleId',
        name: 'ArticleDetail',
        component: () => import('@/views/article/detail/index.vue'),
        meta: {
          hidden: true,
          title: t('文章详情')
        },
      },
    ],
  },
];
