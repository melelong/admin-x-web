<script setup lang="ts">
import {CloseOutlined} from '@ant-design/icons-vue'
import {ref} from "vue";

const quickList = ref([
  {
    name: '系统管理'
  },
  {
    name: '个人中心'
  },
  {
    name: '用户管理'
  },
  {
    name: '首页'
  },
  {
    name: '角色管理'
  },
  {
    name: '数据看板'
  },
])

const currentIndex = ref(2)
</script>

<template>
  <div class="quick-menu-container pt-3px h-40px bg-#fff">
    <ul>
      <li v-for="(item, index) in quickList" :class="{'active': currentIndex === index}" :key="index">
        <div class="h-full flex items-center" >
          <span class="mr-5px">{{ item.name }}</span>
          <CloseOutlined/>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.quick-menu-container {
  position: sticky;
  top: 0;
  z-index: 1000;
}

ul {
  padding: 0 10px;

  li {
    list-style: none;
    display: inline-block;
    height: 34px;
    padding: 0 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 3px;
    color: #1677ff;
    border: 1px solid #1677ff;

    &.active {
      color: #fff;
      background-color: #1677ff;
    }
  }
}
</style>