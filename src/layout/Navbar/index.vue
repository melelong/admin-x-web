<script setup lang="ts">
import {
  SyncOutlined,
  ExpandOutlined,
  SearchOutlined,
  BellOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import Translate from './components/Translate.vue';
import User from './components/User.vue';
</script>

<template>
  <div class="color-white">
    <a-flex justify="space-between">
      <h2 class="ml-16px">Admin X</h2>
      <div>
        <a-space class="font-size-18px" :size="44">
          <BellOutlined />
          <SearchOutlined />
          <AppstoreOutlined />
          <SyncOutlined />
          <Translate />
          <ExpandOutlined />
          <User />
        </a-space>
      </div>
    </a-flex>
  </div>
</template>
