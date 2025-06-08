<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string       // SVG 文件名 (不含扩展名)
  size?: number | string  // 图标尺寸 (支持数字和字符串如 '1em')
  color?: string     // 图标颜色
  spin?: boolean     // 是否启用旋转动画
  rotate?: number    // 静态旋转角度
}>(), {
  size: 24,
  color: 'currentColor',
  spin: false,
  rotate: 0
})

// 使用 Vite 的 glob 导入所有 SVG 文件
const svgModules = import.meta.glob('@/assets/svg/*.svg', { as: 'raw', eager: true })

// 获取 SVG 内容
const svgContent = computed(() => {
  const key = `/src/assets/svg/${props.name}.svg`
  return svgModules[key] || ''
})

// 样式计算
const style = computed(() => ({
  '--svg-icon-size': typeof props.size === 'number'
    ? `${props.size}px`
    : props.size,
  '--svg-icon-color': props.color,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined
}))
</script>

<template>
  <div
    v-if="svgContent"
    :class="['svg-icon', { 'svg-icon--spin': spin }]"
    :style="style"
    v-html="svgContent"
  />
  <div v-else class="svg-icon-error">
    [SVG:{{ name }}]
  </div>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  transition: transform 0.3s ease;
  line-height: 0;
}

.svg-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  stroke: currentColor;
}

.svg-icon--spin {
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>