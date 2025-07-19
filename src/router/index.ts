import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore, useTabsStore } from '@/store';
import { type RouteRaw } from '@/types/router';
import { t } from '@/i18n';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/password-reset',
      name: 'PasswordReset',
      component: () => import('@/views/profile/password-reset/index.vue'),
      meta: {
        visible: true,
        title: t('重置密码'),
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        visible: true,
        title: t('🍃 登录/注册'),
      },
    },
  ],
});

const convertRoute = (route: RouteRaw): RouteRecordRaw => {
  return {
    ...route,
    children: route.children?.map(convertRoute),
    meta: {
      ...route.meta,
      visible: route.meta?.visible,
    },
  } as RouteRecordRaw;
};

// 全局路由守卫
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const tabsStore = useTabsStore();

  if (['Login', 'PasswordReset'].includes(to.name as string)) {
    return next();
  }

  if (!userStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  if (!userStore.user) {
    try {
      const result = await userStore.getUserInfo();
      if (!result) {
        next({ name: 'Login' });
        return;
      }
      await userStore.getPermissions();
      const permissionStore = usePermissionStore();
      permissionStore.menuRoutes.forEach((route: RouteRaw) => {
        router.addRoute(convertRoute(route));
      });
      next({ ...to, replace: true });
    } catch {
      next({ name: 'Login' });
      return;
    }
  }

  tabsStore.addTab(to);
  next();
});

export default router;
