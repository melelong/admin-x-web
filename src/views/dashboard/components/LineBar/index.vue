<script setup lang="ts">
  import * as echarts from 'echarts';
  import { onMounted, ref } from 'vue';
  import uniqueId from 'lodash-es/uniqueId';

  const props = defineProps({
    options: {
      type: Object,
      required: true,
    },
  });

  const domId = ref(uniqueId('echarts-line-bar'));

  onMounted(() => {
    const chartDom = document.getElementById(domId.value);
    const chart = echarts.init(chartDom);
    chart.setOption(props.options);
  });
</script>

<template>
  <div :id="domId" class="w-600px h-400px rounded-8px overflow-hidden inline-block"></div>
</template>
