import { watch } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

/**
 * 自根据路由更新页面标题
 */
export function usePageTitle(defaultTitle = 'Admin x') {
  const route = useRoute();

  // 核心更新逻辑
  const updateTitle = (to: RouteLocationNormalized) => {
    let title = '';

    if (to.meta.title) {
      title = typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title;
      title += ' - ';
    }

    document.title = `${title}${defaultTitle}`;
  };

  // 初始化设置
  updateTitle(route);

  // 监听路由变化
  watch(
    () => route,
    (newRoute) => {
      updateTitle(newRoute);
    },
    { deep: true },
  );
}
