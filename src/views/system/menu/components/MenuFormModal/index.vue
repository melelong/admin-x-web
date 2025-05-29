<script setup lang="ts">
import {saveMenu} from "@/api/system/menu";
import { t } from '@/i18n';

import {reactive, ref} from "vue";

const visible = ref(false)
const modalTile = ref('')
const showModal = () => {
  visible.value = true
}

const formData = reactive({
  name: '',
  path: '',
  visible: true,
  cache: true
})

const handleOk = async () => {
  await saveMenu({
    parentId: 0,
    menuName: '角色管理',
    menuType: 2,
    perms: 'role-manage'
  })
}

defineExpose({
  showModal
})
</script>

<template>
  <a-modal v-model:open="visible" width="400px" :title="modalTile" @ok="handleOk">
    <a-form :model="formData">
      <a-form-item :label="t('所属')">
        <a-select v-model:value="formData.name"></a-select>
      </a-form-item>
      <a-form-item :label="t('名称')">
        <a-input v-model:value="formData.name"></a-input>
      </a-form-item>
      <a-form-item label="地址">
        <a-input v-model:value="formData.path"></a-input>
      </a-form-item>
      <a-form-item label="顺序">
        <a-input v-model:value="formData.path"></a-input>
      </a-form-item>
      <a-form-item label="图标">
        <a-input v-model:value="formData.path"></a-input>
      </a-form-item>
      <a-form-item label="组件">
        <a-select show-search v-model:value="formData.name"></a-select>
      </a-form-item>
      <a-form-item label="权限标识">
        <a-input v-model:value="formData.path"></a-input>
      </a-form-item>
      <a-form-item label="类型">
        <a-radio-group v-model:value="formData.visible">
          <a-radio>目录</a-radio>
          <a-radio>页面</a-radio>
          <a-radio>按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:value="formData.visible">隐藏</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:value="formData.cache">缓存</a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>