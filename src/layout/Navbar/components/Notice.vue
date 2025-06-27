<script setup lang="ts">
import { BellOutlined } from '@ant-design/icons-vue';

import { t } from '@/i18n';

const taskList = ref([
  {
    id: 1,
    name: '同步热门文章',
    percent: 50,
  },
  {
    id: 2,
    name: '报表运行',
    percent: 30,
  },
  {
    id: 3,
    name: '文件上传-导入商品',
    percent: 90,
  },
]);

const activeKey = ref('privateMessage');
</script>

<template>
  <a-popover>
    <template #content>
      <div class="w-400px h-400px overflow-hidden">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="privateMessage" :tab="t('私信')"> </a-tab-pane>
          <a-tab-pane key="task" :tab="t('任务管理')">
            <div
              v-for="item in taskList"
              :key="item.id"
              class="border-[#f0f0f0] border-1px border-solid p-[5px_10px] rd-5px mb-10px"
            >
              <span>{{ item.name }}</span>
              <a-progress class="mb-3px" :percent="item.percent" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="system" :tab="t('系统通知')" />
        </a-tabs>
      </div>
    </template>
    <BellOutlined />
  </a-popover>
</template>
