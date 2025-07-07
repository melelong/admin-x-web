import Layout from '@/layout/Layout.vue';
import { t } from '@/i18n';
import { BugOutlined, HomeOutlined, NodeIndexOutlined, UserOutlined } from '@ant-design/icons-vue';
import { articleList } from '@/router/article';
import { systemList } from '@/router/system';
import { monitorList } from '@/router/monitor';
import { settingList } from '@/router/setting';
import { RouteRaw } from '@/types/router';

export const constantRoutes: RouteRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { directlyShowChildren: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: t('首页'),
          icon: HomeOutlined,
        },
      },
      {
        path: 'readme',
        name: 'Readme',
        component: () => import('@/views/readme/index.vue'),
        meta: {
          icon: NodeIndexOutlined,
          title: t('请阅读我 🪲'),
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          footer: true,
          title: t('数据看板'),
          icon: BugOutlined,
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          icon: UserOutlined,
          title: t('个人中心'),
        },
      },
    ],
  },
  ...articleList,
  ...systemList,
  ...monitorList,
  ...settingList,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      visible: true,
      title: t('🍃 登录/注册'),
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      visible: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      visible: true,
    },
  },
];
