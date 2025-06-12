import { defineStore } from 'pinia';

export type themeType = 'light' | 'dark'

export const useSystemStore = defineStore('system', () => {
  const val: themeType | null = localStorage.getItem('theme') as themeType;
  const theme = ref<themeType>(val ?? 'light');
  const collapsed = localStorage.getItem('collapsed') === 'true';
  const isCollapsed = ref(collapsed);

  const setTheme = (value: themeType) => {
    localStorage.setItem('theme', value);
    theme.value = value;
  };

  const toggleCollapsed = () => {
    localStorage.setItem('collapsed', `${!isCollapsed.value}`);
    isCollapsed.value = !isCollapsed.value;
  };

  return {
    theme,
    isCollapsed,
    setTheme,
    toggleCollapsed,
  };
});