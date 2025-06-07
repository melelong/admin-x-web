<script setup lang="ts">
import { useAuth } from '@/hooks';

const auth = useAuth();
const isLoading = ref(false);
const formData = reactive({
  username: '',
  password: '',
});

const handleLogin = async () => {
  isLoading.value = true;
  await auth.accountLogin(formData).finally(() => {
    isLoading.value = false;
  });
};
const checked = ref(false);
</script>

<template>
  <div class="w-370px bg-white p-30px rounded-8px">
    <h1 class="mb-30px">Admin X</h1>
    <a-form :model="formData" size="large">
      <a-form-item>
        <a-input v-model:value="formData.username" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formData.password" placeholder="请输入密码"></a-input>
      </a-form-item>
      <a-form-item class="mt-36px">
        <a-button class="w-full" type="primary" :loading="isLoading" @click="handleLogin">登录 / 注册</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-checkbox class="mr-8px" v-model:checked="checked"></a-checkbox>
      <span>我已阅读并同意 Admin X </span>
      <a-button class="px-0" type="link">服务协议</a-button>
      <span> 和 </span>
      <a-button class="px-0" type="link">隐私权说明</a-button>
    </div>
  </div>
</template>
