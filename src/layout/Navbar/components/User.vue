<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';

import { useAuth } from '@/hooks/modules/useAuth';
import { t } from '@/i18n';

const auth = useAuth();

const handleClick = ({ key }: { key: 'Profile' | 'signOut' }) => {
  if (key === 'signOut') {
    auth.signOut();
  }

  if (key === 'Profile') {

  }
};
</script>

<template>
  <a-flex align="center">
    <div class="mr-8px">格子惊蛰版</div>
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
        <a-menu @click="handleClick">
          <a-menu-item key="Profile">{{ t('个人中心') }}</a-menu-item>
          <a-menu-item key="signOut">{{ t('退出') }}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-flex>
</template>
