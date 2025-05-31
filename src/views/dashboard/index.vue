<script setup lang="ts">
  import LineBar from '@/views/dashboard/components/LineBar/index.vue';
  import { doubleBar } from '@/views/dashboard/data/doubleBar';
  import { lineBar } from '@/views/dashboard/data/lineBar';
</script>

<template>
  <div class="m-10px">
    <LineBar class="w-40%!" :options="lineBar" />
    <LineBar class="ml-1% w-59%!" :options="doubleBar" />
  </div>
</template>

<style scoped></style>
