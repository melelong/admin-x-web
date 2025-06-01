<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { t } from '@/i18n';
</script>

<template>
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
          <a-menu-item>{{ t('个人中心') }}</a-menu-item>
          <a-menu-item>{{ t('退出') }}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-flex>
</template>
