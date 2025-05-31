import { PartitionOutlined } from '@ant-design/icons-vue';
import Layout from '@/layout/Layout.vue';

export const contentList = [
  {
    path: '/content',
    name: 'Content',
    redirect: '/content/manage',
    meta: { title: '内容管理', icon: PartitionOutlined },
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'ContentManage',
        component: () => import('@/views/content/manage/index.vue'),
        meta: { title: '文章管理' },
      },
      {
        path: 'category',
        name: 'ContentCategory',
        component: () => import('@/views/content/category/index.vue'),
        meta: { title: '分类管理' },
      },
      {
        path: 'audit',
        name: 'ContentAudit',
        component: () => import('@/views/content/audit/index.vue'),
        meta: { title: '评论审核' },
      },
    ],
  },
];
