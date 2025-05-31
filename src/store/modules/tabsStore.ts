import { defineStore } from 'pinia';
import { ref } from 'vue';
import { HomeOutlined } from '@ant-design/icons-vue';
import router from '@/router';

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<MenuTab[]>([]);
  const activeTab = ref('');
  const homeTab = ref<MenuTab>({
    path: '/home',
    title: '首页',
    closable: false,
    icon: HomeOutlined,
  });

  // 初始化首页
  if (!tabs.value.length) {
    tabs.value.push(homeTab.value);
    activeTab.value = homeTab.value.path;
  }

  // 添加新标签（不激活）
  const addTab = (route: any) => {
    // 如果标签已存在，只更新激活状态
    const existingTab = tabs.value.find((t: any) => t.path === route.path);
    if (existingTab) {
      activeTab.value = route.path;
      return;
    }

    // 添加新标签
    tabs.value.push({
      path: route.path,
      title: route.meta?.title || '未命名',
      closable: route.path !== '/home',
      icon: route.meta?.icon,
    });

    // 只更新激活状态，不进行路由跳转
    activeTab.value = route.path;
  };

  /** 移除标签 */
  const removeTab = (path: string) => {
    if (path === '/home') return;

    const removeIndex = tabs.value.findIndex((t: any) => t.path === path);
    if (removeIndex === -1) return;

    tabs.value.splice(removeIndex, 1);

    // 如果移除的是当前激活标签，需要激活另一个标签并进行路由跳转
    if (activeTab.value === path) {
      // 尝试激活最近访问的标签
      const newActiveTab =
        tabs.value[removeIndex] ||
        tabs.value[removeIndex - 1] ||
        homeTab.value;

      // 直接进行路由跳转
      router.push(newActiveTab.path);
    }
  };

  /** 设置当前激活标签并进行路由跳转 */
  const setActiveTab = (path: string) => {
    // 确保标签存在
    const tabExists = tabs.value.some((t) => t.path === path);

    // 更新激活状态
    activeTab.value = tabExists ? path : '/home';

    // 只有在当前路由不是目标路由时才跳转
    if (router.currentRoute.value.path !== path) {
      router.push(path);
    }
  };

  return {
    tabs,
    activeTab,
    homeTab,
    addTab,
    removeTab,
    setActiveTab,
  };
});