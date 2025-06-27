<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';

const searchValue = ref('');
const onSearch = () => {};
</script>

<template>
  <a-popover>
    <template #content>
      <div class="w-400px overflow-hidden">
        <a-input-search
          class="w-full"
          v-model:value="searchValue"
          placeholder="请输入"
          @search="onSearch"
        />
      </div>
    </template>
    <SearchOutlined />
  </a-popover>
</template>
