<script setup lang="ts">
import { useUserStore } from '@/store';
import router from '@/router';

const userStore = useUserStore();

const avatar = computed(() => userStore.user?.avatar);
const nickname = computed(() => userStore.user?.nickname);
const username = computed(() => userStore.user?.username);
</script>

<template>
  <div class="m-10px">
    <a-card>
      <div class="mb-20px">个人中心</div>
      <a-form class="w-500px" :label-col="{ span: 4 }">
        <a-form-item label="头像">
          <Avatar :src="avatar" :size="50" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input readonly :value="username"></a-input>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input readonly :value="nickname"></a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-button @click="router.push({ name: 'PasswordReset' })" type="link">忘记密码</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
