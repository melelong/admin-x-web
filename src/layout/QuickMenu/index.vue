<script setup lang="ts">
import {CloseOutlined} from '@ant-design/icons-vue'
import {ref} from "vue";
import {useRouter} from 'vue-router'
const router = useRouter()
import {useMenuStore} from "@/store/modules/menu";
const {quickMenuList} = useMenuStore()
const currentIndex = ref(2)
const handleClick = (item) => {
 router.push({name: item.name})
}
</script>

<template>
  <div class="quick-menu-container pt-3px h-40px bg-#fff">
    <ul>
      <li v-for="(item, index) in quickMenuList" @click="handleClick(item)" :class="{'active': currentIndex === index}" :key="index">
        <div class="h-full flex items-center" >
          <span class="mr-5px">{{ item.title }}</span>
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