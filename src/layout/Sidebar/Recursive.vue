<script setup>
import { filterRoutes } from '@utils/router'

const props = defineProps({
  routes: {
    type: Array,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

// 生成完整路径
const resolvePath = (path) => {
  return props.basePath ? `${props.basePath}/${path}` : path
}
</script>

<template>
  <template v-for="route in filterRoutes(routes)" :key="route.path">
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
      <Recursive
          :routes="route.children"
          :base-path="resolvePath(route.path)"
      />
    </a-sub-menu>
  </template>
</template>