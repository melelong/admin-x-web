import { defineStore } from 'pinia';

export type themeType = 'light' | 'dark'

export const useSystemStore = defineStore('system', () => {
  const val: themeType | null = localStorage.getItem('theme') as themeType;
  const theme = ref<themeType>(val ?? 'light');

  const setTheme = (value: themeType) => {
    localStorage.setItem('theme', value)
    theme.value = value;
  };

  return {
    theme,
    setTheme,
  };
});