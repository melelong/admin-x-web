import { defineStore } from 'pinia';
import { FrownOutlined } from '@ant-design/icons-vue';
import { constantRoutes } from '@/router/routes';
import { RouteRaw } from '@/types/router';
interface PermissionState {
  menuRoutes: RouteRaw[];
  permissions: Set<string>;
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    menuRoutes: [],
    permissions: new Set(),
  }),

  actions: {
    // 设置权限数据
    setPermissions(menus: Menu[], permissions: string[]) {
      // 动态转换菜单为路由
      const dynamicRoutes = this.transformMenusToRoutes(menus);
      // 合并静态路由
      this.menuRoutes = constantRoutes.concat(dynamicRoutes);

      // 存储权限点
      this.permissions = new Set(permissions);

      // 持久化存储
      localStorage.setItem('permissions', JSON.stringify(permissions));
    },

    // 将后端菜单转换为前端路由
    transformMenusToRoutes(menus: Menu[]): RouteRaw[] {
      return menus.map((menu) => {
        const route: RouteRaw = {
          path: menu.path,
          name: menu.name,
          component: () => import(`@/views/${menu.component}.vue`),
          meta: {
            title: menu.titleZh,
            icon: FrownOutlined,
            cache: menu.cache,
            visible: menu.visible,
            permission: menu.permission,
          },
          children: [],
        };

        if (menu.children && menu.children.length > 0) {
          route.children = this.transformMenusToRoutes(menu.children);
        }

        return route;
      });
    },

    // 检查是否有权限
    hasPermission(permission: string): boolean {
      return this.permissions.has(permission);
    },

    // 从存储中恢复权限
    restorePermissions() {
      const permissions = localStorage.getItem('permissions');
      if (permissions) {
        this.permissions = new Set(JSON.parse(permissions));
      }
    },
  },
});
