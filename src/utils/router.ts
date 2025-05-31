export const filterRoutes = (routes: any) => {
  return routes.filter((route: any) => {
    // 过滤隐藏路由和没有meta的路由
    if (route.meta?.hidden) return false;

    // 递归过滤子路由
    if (route.children) {
      route.children = filterRoutes(route.children);
      return route.children.length > 0;
    }

    return true;
  });
};
