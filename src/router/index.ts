import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore, useTabsStore } from '@/store';
import { type RouteRaw } from '@/types/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
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

  if (to.name === 'Login') {
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
