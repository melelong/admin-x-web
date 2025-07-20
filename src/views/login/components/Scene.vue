<script setup lang="ts">
import sun from '@/assets/svg/sun.svg';
import moon from '@/assets/svg/little-moon.svg';
import tree from '@/assets/svg/tree.svg';
import px from '@/assets/svg/px.svg';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();
const currentEnv = computed(() => (themeStore.currentTheme === 'dark' ? moon : sun));
</script>

<template>
  <img
    class="pos-absolute left-30px top-30px size-30px"
    :class="{
      'rotate-icon': themeStore.currentTheme === 'light',
      'primary-filter-icon': themeStore.currentTheme === 'dark',
    }"
    :src="currentEnv"
    alt=""
  />
  <img
    class="tree-filter-icon hidden lg:flex pos-absolute left-50px bottom-0px h-117px"
    :src="tree"
    alt=""
  />
  <img class="primary-filter-icon pos-absolute right-100px bottom-0px size-30px" :src="px" alt="" />
</template>

<style scoped lang="less">
.filter-icon {
  transition: filter 300ms;
  will-change: filter;
}

.primary-filter-icon {
  filter: drop-shadow(0 0 1em var(--color-primary));
}

.tree-filter-icon {
  filter: drop-shadow(0 0 1em #a1dc5a);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .rotate-icon {
    animation: rotate infinite 20s linear;
  }
}
</style>
