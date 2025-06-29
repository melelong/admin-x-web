<script lang="ts" setup>
import { message } from 'ant-design-vue';

import ArcMenu from '@/components/ArcMenu/index.vue';

interface MenuItem {
  name: string;
  icon: string;
}

const menus = [
  { name: '首页', icon: '🍅' },
  { name: '设置', icon: '🐳' },
  { name: '用户', icon: '🎉' },
  { name: '菜单', icon: '🐶' },
  { name: '退出', icon: '🐸' },
];

const handleMenuClick = (menu: MenuItem, index: number) => {
  message.success(`点击了：${menu.icon}${menu.name}(${index})`);
};

const initialPosition = {
  x: window.innerWidth - 100,
  y: window.innerHeight - 100,
};
</script>

<template>
  <div class="m-10px">
    <div class="p-16px bg-white rounded">
      <div>
        <h1>首页</h1>
        <div class="mt-10px flex justify-between items-end font-size-16px">
          <p>欢迎使用 Admin x</p>
        </div>
      </div>
    </div>
    <ArcMenu
      :menus="menus"
      :initialPosition="initialPosition"
      :draggable="true"
      :radius="120"
      :angle="130"
      :direction="230"
      @menu-click="handleMenuClick"
    />
  </div>
</template>
