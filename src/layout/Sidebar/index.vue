<script setup lang="ts">
import {useRouter} from 'vue-router'
import {HomeOutlined, SearchOutlined} from '@ant-design/icons-vue'
import {computed} from "vue";

const router = useRouter()
const routerList = computed(() => {
  return router.options.routes[0].children
})
</script>

<template>
  <a-menu
      class="h-[calc(100vh-64px)]"
      theme="dark"
      mode="inline"
      :selectedKeys="[router.currentRoute.value.path]"
  >

    <template v-for="item in routerList">
      <a-sub-menu v-if="item.children?.length" :key="`${item.path}`" :title="item.meta.title">
        <template #icon>
          <SearchOutlined/>
        </template>
        <a-menu-item
            v-for="child in item.children"
            :key="`${item.path}/${child.path}`"
            @click="router.push(`${item.path}/${child.path}`)"
        >
          {{child.meta.title }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.path" @click="router.push(item.path)">
        <template #icon>
          <HomeOutlined/>
        </template>
        <span>首页</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>