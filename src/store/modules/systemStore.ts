import { defineStore } from 'pinia';

export type themeType = 'light' | 'dark'

export const useSystemStore = defineStore('system', () => {
  const theme = ref<themeType>('light');

  const setTheme = (value: themeType) => {
    theme.value = value;
  };

  return {
    theme,
    setTheme,
  };
});