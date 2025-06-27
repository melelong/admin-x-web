<script setup lang="ts">
import { message } from 'ant-design-vue';

import { useAuth } from '@/hooks';

const checked = ref(false);
const auth = useAuth();
const isLoading = ref(false);
const formData = reactive({
  username: '',
  password: '',
});

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

/**
 * 登录
 */
const handleSubmit = async () => {
  if (!checked.value) {
    message.warn('请先同意服务协议和隐私权说明');
    return;
  }

  isLoading.value = true;
  await auth.accountLogin(formData).finally(() => {
    isLoading.value = false;
  });
};

const handleRegister = () => {
  emit('toggle');
};
</script>

<template>
  <a-form @finish="handleSubmit" :model="formData" size="large">
    <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名或邮箱' }]">
      <a-input v-model:value="formData.username" placeholder="请输入用户名或邮箱"></a-input>
    </a-form-item>
    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
      <a-input-password
        v-model:value="formData.password"
        placeholder="请输入密码"
      ></a-input-password>
    </a-form-item>
    <a-form-item class="mt-36px">
      <a-button class="w-full" type="primary" html-type="submit" :loading="isLoading">
        登录
      </a-button>
      <div class="mt-9px flex items-center">
        <span>没有账号？</span>
        <a-button class="px-0!" @click="handleRegister" type="link" size="small">点击注册</a-button>
      </div>
    </a-form-item>
  </a-form>
  <a-checkbox v-model:checked="checked">
    我已阅读并同意
    <a-button class="px-0" type="link" @click.stop>服务协议</a-button>
    <span> 和 </span>
    <a-button class="px-0" type="link" @click.stop>隐私权说明</a-button>
  </a-checkbox>
</template>
