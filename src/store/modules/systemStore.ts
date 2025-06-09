import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const theme = ref<'light' | 'dark'>('light');

  return {
    theme,
  };
});