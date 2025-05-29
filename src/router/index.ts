import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/Layout.vue';
import { HomeOutlined, NodeIndexOutlined, BugOutlined, UserOutlined } from '@ant-design/icons-vue';
import { contentList } from './content';
import { systemList } from './system';
import { monitorList } from './monitor';
import { settingList } from './setting';
import { useTabsStore } from '@store/modules/tabsStore';

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@views/home/index.vue'),
        meta: {
          title: '首页',
          icon: HomeOutlined,
        },
      },
      {
        path: 'readme',
        name: 'Readme',
        component: () => import('@views/readme/index.vue'),
        meta: {
          icon: NodeIndexOutlined,
          title: '请阅读我',
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@views/dashboard/index.vue'),
        meta: {
          title: '数据看板',
          icon: BugOutlined,
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@views/profile/index.vue'),
        meta: {
          icon: UserOutlined,
          title: '个人中心',
        },
      },
    ],
  },
  ...contentList,
  ...systemList,
  ...monitorList,
  ...settingList,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录/注册',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const store = useTabsStore();
  store.addTab(to);
  next();
});

export default router;
