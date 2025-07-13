<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useMouseInElement, useDebounceFn } from '@vueuse/core';

interface Color {
  h: number;
  s: number;
  v: number;
  a?: number;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    presetColors?: string[];
  }>(),
  {
    modelValue: '#1890ff',
    presetColors: () => [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#ffff00',
      '#00ffff',
      '#ff00ff',
      '#ffa500',
      '#800080',
      '#008000',
      '#000080',
      '#800000',
      '#808000',
      '#008080',
      '#808080',
      '#c0c0c0',
      '#ffffff',
      '#000000',
    ],
  },
);

const emit = defineEmits(['update:modelValue']);

const showPanel = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const saturationRef = ref<HTMLElement | null>(null);
const hueRef = ref<HTMLElement | null>(null);

// 当前颜色（HSV 格式）
const color = ref<Color>({ h: 0, s: 100, v: 100 });
// 拖动状态
const isDraggingSaturation = ref(false);
const isDraggingHue = ref(false);

// 初始化颜色
const initColor = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 100, v: 100 };

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s: number,
    v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
};

// HSV 转 HEX
const hsvToHex = (hsv: Color): string => {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 当前颜色值（HEX）
const colorValue = computed(() => hsvToHex(color.value));

// 饱和度选择器背景
const saturationBackground = computed(() => {
  return `linear-gradient(to top, #000, rgba(0,0,0,0)),
          linear-gradient(to right, #fff, ${hsvToHex({ h: color.value.h, s: 100, v: 100 })})`;
});

// 色相选择器背景
const hueBackground = computed(() => {
  return 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)';
});

// 颜色选择器位置
const saturationPosition = computed(() => ({
  left: `${color.value.s}%`,
  top: `${100 - color.value.v}%`,
}));

const huePosition = computed(() => ({
  left: `${(color.value.h / 360) * 100}%`,
}));

// 监听外部点击关闭面板
const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    showPanel.value = false;
  }
};

// 使用防抖函数处理色相变化
const updateHue = useDebounceFn((x: number) => {
  color.value.h = Math.max(0, Math.min(360, Math.round((x / 100) * 360)));
}, 10);

// 使用防抖函数处理饱和度/明度变化
const updateSaturationValue = useDebounceFn((x: number, y: number) => {
  color.value.s = Math.max(0, Math.min(100, Math.round(x * 100)));
  color.value.v = Math.max(0, Math.min(100, Math.round(100 - y * 100)));
}, 10);

// 开始拖动饱和度选择器
const startSaturationDrag = () => {
  isDraggingSaturation.value = true;
};

// 开始拖动色相选择器
const startHueDrag = () => {
  isDraggingHue.value = true;
};

// 处理饱和度区域鼠标移动
const { x: satX, y: satY } = useMouseInElement(saturationRef);
watch([satX, satY, isDraggingSaturation], ([x, y, dragging]) => {
  if (!saturationRef.value || !dragging) return;

  const rect = saturationRef.value.getBoundingClientRect();
  const posX = (x - rect.left) / rect.width;
  const posY = (y - rect.top) / rect.height;

  if (posX >= 0 && posX <= 1 && posY >= 0 && posY <= 1) {
    updateSaturationValue(posX, posY);
  }
});

// 处理色相区域鼠标移动
const { x: hueX } = useMouseInElement(hueRef);
watch([hueX, isDraggingHue], ([x, dragging]) => {
  if (!hueRef.value || !dragging) return;

  const rect = hueRef.value.getBoundingClientRect();
  const posX = (x - rect.left) / rect.width;

  if (posX >= 0 && posX <= 1) {
    updateHue(posX * 100);
  }
});

// 停止拖动
const stopDrag = () => {
  isDraggingSaturation.value = false;
  isDraggingHue.value = false;
};

// 选择预设颜色
const selectPreset = (hex: string) => {
  color.value = initColor(hex);
};

// 处理输入框变化
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    color.value = initColor(value);
  }
};

// 初始化颜色
onMounted(() => {
  color.value = initColor(props.modelValue);
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('mouseup', stopDrag);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('mouseup', stopDrag);
});

// 监听颜色变化
watch(colorValue, (val) => {
  emit('update:modelValue', val);
});

// 监听外部传入的颜色变化
watch(
  () => props.modelValue,
  (val) => {
    if (val !== colorValue.value) {
      color.value = initColor(val);
    }
  },
);
</script>

<template>
  <div class="ant-color-picker" ref="containerRef">
    <div class="ant-color-picker-trigger" @click="showPanel = !showPanel">
      <div class="ant-color-picker-color">
        <div class="ant-color-picker-color-inner" :style="{ backgroundColor: colorValue }" />
      </div>
      <span class="ant-color-picker-text">{{ colorValue }}</span>
    </div>

    <div v-if="showPanel" class="ant-color-picker-panel">
      <div class="ant-color-picker-panel-inner">
        <div
          class="ant-color-picker-saturation"
          ref="saturationRef"
          :style="{ background: saturationBackground }"
          @mousedown="startSaturationDrag"
        >
          <div class="ant-color-picker-saturation-pointer" :style="saturationPosition">
            <div class="ant-color-picker-saturation-pointer-inner" />
          </div>
        </div>

        <div
          class="ant-color-picker-hue"
          ref="hueRef"
          :style="{ background: hueBackground }"
          @mousedown="startHueDrag"
        >
          <div class="ant-color-picker-hue-pointer" :style="huePosition">
            <div class="ant-color-picker-hue-pointer-inner" />
          </div>
        </div>

        <div class="ant-color-picker-color-block">
          <div class="ant-color-picker-current-color" :style="{ backgroundColor: colorValue }" />
          <div class="ant-color-picker-color-input">
            <input :value="colorValue" @input="handleInput" />
          </div>
        </div>

        <div class="ant-color-picker-presets">
          <div class="ant-color-picker-presets-colors">
            <div
              v-for="(c, i) in presetColors"
              :key="i"
              class="ant-color-picker-presets-color"
              :style="{ backgroundColor: c }"
              @click="selectPreset(c)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.ant-color-picker {
  position: relative;
  display: inline-block;
  font-size: 14px;
  line-height: 1.5715;
}

.ant-color-picker-trigger {
  display: flex;
  align-items: center;
  padding: 4px 11px;
  cursor: pointer;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border-secondary);
  border-radius: 2px;
  transition: all 0.3s;
}

.ant-color-picker-trigger:hover {
  border: 1px solid var(--color-primary);
}

.ant-color-picker-color {
  position: relative;
  width: 28px;
  height: 28px;
  overflow: hidden;
  background-size: 8px;
  border-radius: 2px;
}

.ant-color-picker-color-inner {
  width: 100%;
  height: 100%;
}

.ant-color-picker-text {
  margin-left: 8px;
  color: var(--color-text-secondary);
}

.ant-color-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 8px;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border-secondary);
  border-radius: 2px;
  box-shadow:
    0 3px 6px -4px rgb(0 0 0 / 12%),
    0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
}

.ant-color-picker-panel-inner {
  padding: 12px;
}

.ant-color-picker-saturation {
  position: relative;
  width: 240px;
  height: 120px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
}

.ant-color-picker-saturation-pointer {
  position: absolute;
  transform: translate(-50%, -50%);
}

.ant-color-picker-saturation-pointer-inner {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  transform: translate(-4px, -4px);
}

.ant-color-picker-hue {
  position: relative;
  height: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 2px;
}

.ant-color-picker-hue-pointer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.ant-color-picker-hue-pointer-inner {
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  transform: translate(-5px, -1px);
}

.ant-color-picker-color-block {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.ant-color-picker-current-color {
  width: 24px;
  height: 24px;
  background-size: 8px;
  border-radius: 2px;
}

.ant-color-picker-color-input {
  flex: 1;
  margin-left: 10px;
}

.ant-color-picker-color-input input {
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}

.ant-color-picker-color-input input:focus {
  outline: none;
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
}

.ant-color-picker-presets {
  margin-top: 12px;
}

.ant-color-picker-presets-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ant-color-picker-presets-color {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 2px;
  transition: transform 0.1s;
}

.ant-color-picker-presets-color:hover {
  transform: scale(1.1);
}
</style>
