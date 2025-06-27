<script setup lang="ts">
import {message} from 'ant-design-vue';

import {userRegister} from '@/api/user';

const checked = ref(false);
const isLoading = ref(false);
const formData = reactive({
  email: '',
  password: '',
  nickname: '',
});

const emit = defineEmits<{
  (e: 'toggle'): void
}>();

/**
 * 注册
 */
const formRef = ref();
const handleSubmit = async () => {
  if (!checked.value) {
    message.warn('请先同意服务协议和隐私权说明');
    return;
  }

  isLoading.value = true;
  await userRegister(formData).finally(() => {
    isLoading.value = false;
  });
  message.success('注册成功');
  emit('toggle')
};
</script>

<template>

  <a-form
      @finish="handleSubmit"
      ref="formRef"
      size="large"
      :model="formData"
  >
    <a-form-item
        name="nickname"
        :rules="[{ required: true, message: '请输入昵称' }]"
    >
      <a-input v-model:value="formData.nickname" placeholder="请输入昵称"></a-input>
    </a-form-item>
    <a-form-item
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }]"
    >
      <a-input v-model:value="formData.email" placeholder="请输入邮箱"></a-input>
    </a-form-item>
    <a-form-item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formData.password" placeholder="请输入密码"></a-input-password>
    </a-form-item>
    <a-form-item class="mt-36px">
      <a-button
          class="w-full"
          type="primary"
          html-type="submit"
          :loading="isLoading"
      >
        注册
      </a-button>
      <div class="mt-9px flex items-center">
        <span>已有账号？</span>
        <a-button class="px-0!" @click="emit('toggle')" type="link" size="small">点击登录</a-button>
      </div>
    </a-form-item>
  </a-form>
  <a-checkbox class="mr-8px" v-model:checked="checked"></a-checkbox>
  <span>我已阅读并同意</span>
  <a-button class="px-0" type="link">服务协议</a-button>
  <span> 和 </span>
  <a-button class="px-0" type="link">隐私权说明</a-button>
</template>
