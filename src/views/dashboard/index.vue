<script setup lang="ts">
import ECharts from '@/components/ECharts/index.vue';
import { doubleBar } from '@/views/dashboard/data/doubleBar';
import { lineBar } from '@/views/dashboard/data/lineBar';
</script>

<template>
  <div class="m-10px">
    <ECharts class="w-40%!" :option="lineBar" />
    <ECharts class="ml-1% w-59%!" :option="doubleBar" />
  </div>
</template>