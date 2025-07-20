<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

interface SvgIconProps {
  name: string; // SVG 文件名 (不含扩展名)
  size?: number | string; // 图标尺寸 (支持数字和字符串如 '1em')
  color?: string; // 图标颜色
  spin?: boolean; // 是否启用旋转动画
  rotate?: number; // 静态旋转角度
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  size: 24,
  color: 'currentColor',
  spin: false,
  rotate: 0,
});

// 使用 Vite 的 glob 导入所有 SVG 文件
const svgModules = import.meta.glob('/src/assets/svg/*.svg', {
  as: 'raw',
  eager: false, // 使用异步加载
});

const svgContent = ref<string>('');
const isLoading = ref(true);
const errorMessage = ref('');

// 获取 SVG 内容
const loadSvg = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const key = `/src/assets/svg/${props.name}.svg`;
    const module = svgModules[key];

    if (module) {
      svgContent.value = await module();
    }
  } catch (err) {
    errorMessage.value = (err as Error).message || 'Failed to load SVG';
    svgContent.value = '';
  } finally {
    isLoading.value = false;
  }
};

// 监听名称变化重新加载
watchEffect(() => {
  loadSvg();
});

// 样式计算
const style = computed(() => {
  return {
    '--svg-icon-size': typeof props.size === 'number' ? `${props.size}px` : props.size,
    '--svg-icon-color': props.color,
    '--svg-icon-rotate': `${props.rotate}deg`,
  };
});

// 图标类名
const iconClasses = computed(() => [
  'svg-icon',
  {
    'svg-icon-spin': props.spin,
    'svg-icon-loading': isLoading.value,
  },
]);
</script>

<template>
  <div class="svg-icon-wrapper">
    <div
      v-if="svgContent && !isLoading"
      :class="iconClasses"
      :style="style"
      v-html="svgContent"
      role="img"
      :aria-label="`${name} icon`"
    />

    <div
      v-else-if="isLoading"
      class="svg-icon-loading-placeholder"
      :style="{ width: style['--svg-icon-size'], height: style['--svg-icon-size'] }"
      aria-busy="true"
      aria-label="Loading icon"
    />
  </div>
</template>

<style scoped lang="less">
@keyframes rotate {
  from {
    transform: rotate(var(--svg-icon-rotate));
  }

  to {
    transform: rotate(calc(var(--svg-icon-rotate) + 360deg));
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.6;
  }
}

.svg-icon-wrapper {
  display: inline-flex;
  vertical-align: middle;
}

.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--svg-icon-size);
  height: var(--svg-icon-size);
  color: var(--svg-icon-color);
  transform: rotate(var(--svg-icon-rotate));
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.svg-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentcolor;
  stroke: currentcolor;
}

/* 旋转动画 */
.svg-icon-spin {
  animation: rotate 1.5s linear infinite;
}

/* 加载状态动画 */
.svg-icon-loading {
  position: relative;
  background-color: var(--svg-icon-color);
  border-radius: 50%;
  opacity: 0.2;
  animation: pulse 1.5s ease-in-out infinite;
}

.svg-icon-loading-placeholder {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
