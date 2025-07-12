<template>
  <div
    class="arc-menu-wrapper"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <div
      class="arc-menu-control"
      :class="{ open: isOpen }"
      @click="toggleMenu"
      @mousedown="startDrag"
    >
      <slot>
        <i>
          <BugOutlined class="color-[var(--color-primary)]" />
        </i>
      </slot>
    </div>

    <div
      v-for="(menu, index) in menus"
      :key="index"
      class="arc-menu-item"
      :style="getMenuItemStyle(index)"
      @click="handleItemClick(menu, index)"
    >
      <i>{{ menu.icon }}</i>
      <span>{{ menu.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BugOutlined } from '@ant-design/icons-vue';

// 定义菜单项类型
interface MenuItem {
  name: string;
  icon: string;
}

// 定义位置类型
interface Position {
  x: number;
  y: number;
}

// 定义组件Props
const props = withDefaults(
  defineProps<{
    menus: MenuItem[];
    initialPosition?: Position;
    draggable?: boolean;
    radius?: number;
    angle?: number;
    direction?: string | number;
  }>(),
  {
    initialPosition: () => ({ x: 300, y: 200 }),
    draggable: true,
    radius: 120,
    angle: 180,
    direction: 'top',
  },
);

// 定义组件事件
const emit = defineEmits<{
  (e: 'menu-click', menu: MenuItem, index: number): void;
}>();

// 组件状态
const isOpen = ref(false);
const position = reactive<Position>({ ...props.initialPosition });
const isDragging = ref(false);
const dragStartPos = reactive<Position>({ x: 0, y: 0 });

// 方向角度映射
const directionAngles = {
  top: 270,
  right: 0,
  bottom: 90,
  left: 180,
  'top-left': 225,
  'top-right': 315,
  'bottom-left': 135,
  'bottom-right': 45,
};

// 计算起始角度
const startAngle = computed(() => {
  // 从映射中获取角度值，如果传入的是数字则直接使用
  const angleValue =
    typeof props.direction === 'string'
      ? directionAngles[props.direction as keyof typeof directionAngles] || 270
      : props.direction;

  // 计算起始角度（减去一半的展开角度）
  return angleValue - props.angle / 2;
});

// 计算菜单项位置
const getMenuItemStyle = (index: number) => {
  if (!isOpen.value) {
    return {
      opacity: 0,
      transform: 'translate(0, 0)',
    };
  }

  // 计算当前菜单项的角度
  const angle = startAngle.value + index * (props.angle / (props.menus.length - 1));
  const radian = angle * (Math.PI / 180);

  // 计算位置
  const x = Math.cos(radian) * props.radius;
  const y = Math.sin(radian) * props.radius;

  return {
    opacity: 1,
    transform: `translate(${x}px, ${y}px)`,
    transition: `transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s, opacity 0.2s`,
  };
};

// 切换菜单状态
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// 菜单项点击事件
const handleItemClick = (menu: MenuItem, index: number) => {
  emit('menu-click', menu, index);
};

// 开始拖拽
const startDrag = (e: MouseEvent) => {
  if (!props.draggable) return;

  isDragging.value = true;
  dragStartPos.x = e.clientX - position.x;
  dragStartPos.y = e.clientY - position.y;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
};

// 拖拽中
const drag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  position.x = e.clientX - dragStartPos.x;
  position.y = e.clientY - dragStartPos.y;

  // 限制在窗口范围内
  position.x = Math.max(30, Math.min(window.innerWidth - 30, position.x));
  position.y = Math.max(30, Math.min(window.innerHeight - 30, position.y));
};

// 停止拖拽
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
};

// 监听初始位置变化
watch(
  () => props.initialPosition,
  (newPos) => {
    position.x = newPos.x;
    position.y = newPos.y;
  },
  { deep: true },
);

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped lang="less">
.arc-menu-wrapper {
  position: fixed;
  z-index: 1000;
  user-select: none;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}

.arc-menu-control {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border-secondary);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgb(0 0 0 / 5%);
  transform: rotate(0) scale(1);
  transition: all 0.3s ease;
}

.arc-menu-control:hover {
  box-shadow: 0 6px 25px rgb(0 0 0 / 10%);
}

.arc-menu-control.open {
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border);
  transform: rotate(-45deg) scale(1.1);
}

.arc-menu-control i {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.arc-menu-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  box-shadow: 0 3px 15px rgb(0 0 0 / 20%);
  transform: translate(0, 0);
}

.arc-menu-item:hover {
  z-index: 20;
  box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
}

.arc-menu-item i {
  margin-bottom: 2px;
  font-size: 18px;
}

.arc-menu-item span {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.1;
  color: var(--color-text);
  text-align: center;
}
</style>
