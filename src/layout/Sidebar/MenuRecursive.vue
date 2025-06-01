<script setup>
import { filterRoutes } from '@/utils/router';

const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
});

const resolvePath = (path) => {
  const normalizedBase = props.basePath.replace(/\/+$/, '');
  const normalizedPath = (path || '').replace(/^\/+/, '');

  if (!normalizedBase) return `/${normalizedPath}`;
  if (!normalizedPath) return normalizedBase;

  return `${normalizedBase}/${normalizedPath}`;
};
</script>

<template>
  <template v-for="route in filterRoutes(routes)" :key="route.path">
    <template v-if="route.meta?.directlyShowChildren">
      <MenuRecursive :routes="route.children" :base-path="resolvePath(route.path)" />
    </template>

    <template v-else>
      <template v-if="!route.children">
        <a-menu-item :key="resolvePath(route.path)">
          <template v-if="route.meta?.icon">
            <component :is="route.meta?.icon" />
          </template>
          <span>{{ route.meta.title }}</span>
        </a-menu-item>
      </template>

      <a-sub-menu v-else :key="resolvePath(route.path)">
        <template #title>
          <template v-if="route.meta?.icon">
            <component :is="route.meta.icon" />
          </template>
          <span>{{ route.meta?.title }}</span>
        </template>
        <MenuRecursive :routes="route.children" :base-path="resolvePath(route.path)" />
      </a-sub-menu>
    </template>
  </template>
</template>
