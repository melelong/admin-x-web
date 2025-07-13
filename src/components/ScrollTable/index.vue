<template>
  <div class="scroll-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <div class="table-header">
      <div
        class="header-cell"
        v-for="(column, index) in columns"
        :key="index"
        :style="{ width: column.width }"
      >
        {{ column.title }}
      </div>
    </div>

    <div class="scroll-wrapper" :style="{ height: `${rowHeight * visibleRows}px` }">
      <div
        class="scroll-content"
        :style="{
          transform: `translateY(${offset}px)`,
          transition: `transform ${scrollSpeed}s linear`,
        }"
      >
        <div
          v-for="(row, rowIndex) in displayData"
          :key="rowIndex"
          class="table-row"
          :style="{ height: `${rowHeight}px` }"
        >
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="table-cell"
            :style="{ width: column.width, color: getColor(column, row) }"
          >
            <span v-if="column.formatter">
              {{ column.formatter(row[column.dataIndex], row) }}
            </span>
            <template v-else>
              {{ row[column.dataIndex] }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="status-bar">
      <span class="scroll-status">
        {{ isPaused ? '已暂停' : '滚动中' }}
      </span>
      <a-button type="link" size="small" @click="toggleScroll">
        {{ isPaused ? '继续滚动' : '暂停滚动' }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 表格列配置
  columns: {
    type: Array<any>,
    required: true,
    default: () => [],
  },

  // 表格数据
  dataSource: {
    type: Array<any>,
    required: true,
    default: () => [],
  },

  // 行高（像素）
  rowHeight: {
    type: Number,
    default: 48,
  },

  // 可见行数
  visibleRows: {
    type: Number,
    default: 5,
  },

  // 滚动间隔（毫秒）
  scrollInterval: {
    type: Number,
    default: 3000,
  },

  // 滚动速度（秒）
  scrollSpeed: {
    type: Number,
    default: 0.8,
  },

  // 是否启用鼠标悬停暂停
  hoverPause: {
    type: Boolean,
    default: true,
  },
});

const offset = ref(0);
const isPaused = ref(false);
const currentIndex = ref(0);
let timer: any = null;

// 计算显示的数据（包含重复数据以实现无缝滚动）
const displayData = computed(() => {
  if (props.dataSource.length === 0) return [];

  // 当数据不足以填满可见区域时，复制数据
  if (props.dataSource.length < props.visibleRows) {
    const repeatedData = [];
    const copies = Math.ceil(props.visibleRows / props.dataSource.length);
    for (let i = 0; i < copies; i++) {
      repeatedData.push(...props.dataSource);
    }
    return repeatedData;
  }

  // 当数据足够时，添加部分数据以实现无缝滚动
  return [...props.dataSource, ...props.dataSource.slice(0, props.visibleRows)];
});

// 滚动到下一项
const scrollToNext = () => {
  if (isPaused.value || props.dataSource.length === 0) return;

  currentIndex.value = (currentIndex.value + 1) % props.dataSource.length;
  offset.value = -currentIndex.value * props.rowHeight;

  // 当滚动到数据末尾时，重置位置
  if (currentIndex.value === props.dataSource.length) {
    setTimeout(() => {
      offset.value = 0;
      currentIndex.value = 0;
    }, props.scrollSpeed * 1000);
  }
};

// 开始滚动
const startScrolling = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(scrollToNext, props.scrollInterval);
};

// 暂停滚动
const pauseScroll = () => {
  if (props.hoverPause) {
    isPaused.value = true;
  }
};

// 恢复滚动
const resumeScroll = () => {
  if (props.hoverPause) {
    isPaused.value = false;
  }
};

// 手动切换滚动状态
const toggleScroll = () => {
  isPaused.value = !isPaused.value;
};

// 监听数据变化
watch(
  () => props.dataSource,
  () => {
    currentIndex.value = 0;
    offset.value = 0;
  },
);

// 监听配置变化
watch(
  () => [props.scrollInterval, props.scrollSpeed],
  () => {
    startScrolling();
  },
);

const getColor = (column: Record<string, any>, row: Record<string, any>) => {
  if (typeof column.color === 'function') {
    return column.color(row[column.dataIndex]);
  }
  return column.color;
};

onMounted(() => {
  startScrolling();
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped lang="less">
.scroll-table-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-outer);
}

.table-header {
  display: flex;
  padding: 0 16px;
  font-weight: bold;
  color: var(--color-primary);
  background-color: var(--color-bg-container);
  border-bottom: 1px solid var(--color-border-secondary);
}

.header-cell {
  padding: 15px 12px;
  font-size: 15px;
  text-align: center;
}

.scroll-wrapper {
  position: relative;
  overflow: hidden;
}

.scroll-content {
  transition-timing-function: linear;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: var(--color-bg-container);
  transition: background-color 0.3s;
}

.table-row:nth-child(2n) {
  background: var(--color-bg-container);

  .table-cell {
    color: #00b3b5;
  }
}

.table-row:hover {
  background: var(--color-bg-container);
}

.table-cell {
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: var(--color-primary);
  text-align: center;
  white-space: nowrap;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  font-size: 12px;
  background: var(--color-bg-container);
  border-top: 1px solid var(--color-border-secondary);
}

.scroll-status {
  display: flex;
  align-items: center;
}

.scroll-status::before {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  content: '';
  background-color: v-bind('isPaused ? "#f5222d" : "#52c41a"');
  border-radius: 50%;
}
</style>
