<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { avatarList } from '@/assets/avatar/icons';
const props = withDefaults(
  defineProps<{
    shape?: 'circle' | 'square';
    name?: string;
    size?: number | string;
    src?: string;
  }>(),
  {
    shape: 'circle',
    name: '',
    src: '',
    size: 44,
  },
);

const avatar = computed(() => {
  const data = avatarList.find((item) => item.name === props.src);
  if (data) {
    return data.src;
  }
  return props.src;
});
</script>

<template>
  <a-avatar :shape="shape" :src="avatar" :size="size">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>
