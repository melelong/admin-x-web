import { defineStore } from 'pinia';

export type layoutType = 'classic' | 'unbounded';
type MenuMode = 'vertical' | 'horizontal' | 'inline';

export const useSystemStore = defineStore('system', () => {
  const collapsed = localStorage.getItem('collapsed') === 'true';
  const isCollapsed = ref(collapsed);

  const layoutConfig = computed(() => {
    return {
      // 经典
      classic: {
        collapsed: true,
        menu: {
          style: 'overflow-y-auto h-[calc(100vh_-_var(--header-height))]',
          mode: 'inline' as MenuMode,
        },
      },
      // 无界
      unbounded: {
        collapsed: false,
        menu: {
          style: 'h-60px',
          mode: 'horizontal' as MenuMode,
        },
      },
    };
  });

  const layoutStr: layoutType | null = localStorage.getItem('layout') as layoutType;
  const currentLayout = ref<layoutType>(layoutStr ?? 'classic');

  const layout = computed(() => {
    return layoutConfig.value[currentLayout.value];
  });

  const toggleCollapsed = () => {
    localStorage.setItem('collapsed', `${!isCollapsed.value}`);
    isCollapsed.value = !isCollapsed.value;
  };

  const setLayout = (value: layoutType) => {
    localStorage.setItem('layout', value);
    currentLayout.value = value;
  };

  const setCollapsed = (value: boolean) => {
    isCollapsed.value = value;
  };

  return {
    isCollapsed,
    layout,
    setLayout,
    currentLayout,
    toggleCollapsed,
    setCollapsed,
  };
});
