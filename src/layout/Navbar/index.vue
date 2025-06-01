<script setup lang="ts">
import {
  UserOutlined,
  SyncOutlined,
  ExpandOutlined,
  SearchOutlined,
  BellOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { setLocale, currentLanguage } from '@/i18n';

const changeLang = (e: { key: string }) => {
  setLocale(e.key as 'zh-CN' | 'en-US');
};
</script>

<template>
  <div class="color-white">
    <a-flex justify="space-between">
      <h2 class="ml-16px">Admin X</h2>
      <div>
        <a-space class="font-size-18px" :size="44">
          <BellOutlined />
          <SearchOutlined />
          <AppstoreOutlined />
          <SyncOutlined />
          <div class="font-size-0 flex items-center">
            <a-dropdown>
              <img class="w-18px h-18px" src="/src/assets/svg/translate.svg" alt="" />
              <template #overlay>
                <a-menu @click="changeLang" :selectedKeys="[currentLanguage]">
                  <a-menu-item key="zh-CN">中文</a-menu-item>
                  <a-menu-item key="en-US">English</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <ExpandOutlined />
          <a-flex align="center">
            <span class="mr-8px">格子惊蛰版</span>
            <a-dropdown>
              <a-avatar
                src="https://p26-passport.byteacctimg.com/img/user-avatar/e90991924d697daba79ae944826049ba~80x80.awebp"
                :size="44"
              >
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item> 个人中心</a-menu-item>
                  <a-menu-item> 退出</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-flex>
        </a-space>
      </div>
    </a-flex>
  </div>
</template>
