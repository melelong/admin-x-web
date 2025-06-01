<script setup lang="ts">
import ECharts from '@/components/ECharts/index.vue';
import ScrollTable from '@/components/ScrollTable/index.vue';

import { columns, tableData } from '@/views/dashboard/data/scrollTable';
import { doubleBar } from '@/views/dashboard/data/doubleBar';
import { lineBar } from '@/views/dashboard/data/lineBar';
import { pieData } from '@/views/dashboard/data/pieData';
</script>

<template>
  <div class="m-10px">
    <a-row :gutter="[10, 10]">
      <a-col :span="24" :xl="12">
        <ECharts :option="doubleBar" />
      </a-col>
      <a-col :span="24" :xl="12">
        <ScrollTable
          class="px-10px"
          :columns="columns"
          :data-source="tableData"
          :row-height="40"
          :visible-rows="5"
          :scroll-interval="2500"
          :scroll-speed="0.6"
        />
      </a-col>
      <a-col :span="24" :xl="12">
        <ECharts :option="pieData" />
      </a-col>
      <a-col :span="24" :xl="12">
        <ECharts :option="lineBar" />
      </a-col>
    </a-row>
  </div>
</template>
