<script setup lang="ts">
import LoginForm from '@/views/login/LoginForm.vue';
import RegisterForm from '@/views/login/RegisterForm.vue';

const isLogin = ref(true)
const toggleChange = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="w-screen h-screen bg-[url('/src/assets/images/login-bg.png')] bg-no-repeat bg-cover">
    <div class="pr-10% h-full flex items-center justify-end">
      <div class="w-360px bg-white p-30px rounded-8px">
        <h1 class="mb-30px">Admin X</h1>
        <LoginForm v-if="isLogin" @toggle="toggleChange"/>
        <RegisterForm v-else @toggle="toggleChange"/>
      </div>
    </div>
  </div>
</template>