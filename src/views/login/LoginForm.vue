<script setup lang="ts">
import router from "@/router";
import {reactive, ref} from 'vue'

const formData = reactive({
  username: '',
  password: ''
})

const handleLogin = () => {
  router.replace({name: "Home"});
}
const checked = ref(false)
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
        <a-button class="w-200px" type="primary" @click="handleLogin">登录 / 注册</a-button>
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