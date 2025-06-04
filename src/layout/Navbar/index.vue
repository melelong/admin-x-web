<script setup lang="ts">
import {
  ExpandOutlined,
  SearchOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

import Notice from '@/layout/Navbar/components/Notice.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import Translate from '@/layout/Navbar/components/Translate.vue';
import User from '@/layout/Navbar/components/User.vue';
</script>

<template>
  <div class="color-white">
    <a-flex justify="space-between">
      <h1 class="ml-17px tracking-[3px]">Admin X</h1>
      <a-space class="font-size-18px" :size="44">
        <Notice />
        <SearchOutlined />
        <AppstoreOutlined />
        <Reload />
        <Translate />
        <ExpandOutlined />
        <User />
      </a-space>
    </a-flex>
  </div>
</template>
