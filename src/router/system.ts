import { BlockOutlined } from '@ant-design/icons-vue';

import { t } from '@/i18n';
import Layout from '@/layout/Layout.vue';

export const systemList = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    meta: { title: t('系统管理'), icon: BlockOutlined },
    component: Layout,
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: t('菜单管理') },
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: t('用户管理') },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: t('角色管理') },
      },
      {
        path: 'icons',
        name: 'Icons',
        component: () => import('@/views/system/icons/index.vue'),
        meta: { title: t('图标管理') },
      },
    ],
  },
];
