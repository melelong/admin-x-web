<script setup lang="ts">
import LoginForm from '@/views/login/components/LoginForm.vue';
import RegisterForm from '@/views/login/components/RegisterForm.vue';
import logoPath from '@/assets/images/logo.jpg';

const isLogin = ref(true);
const toggleChange = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <div class="w-screen h-screen bg-[url('/src/assets/images/login-bg.png')] bg-no-repeat">
    <div class="h-full flex items-center justify-center">
      <a-card class="w-400px p-30px select-none">
        <h2 class="mb-30px flex items-center justify-between">
          <span>{{ isLogin ? '欢迎登录' : '欢迎注册' }} Admin x</span>
          <img class="h-32px rounded-5px" :src="logoPath" alt="Admin x" />
        </h2>
        <LoginForm v-if="isLogin" @toggle="toggleChange" />
        <RegisterForm v-else @toggle="toggleChange" />
      </a-card>
    </div>
  </div>
</template>
