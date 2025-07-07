<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { avatarList } from '@/assets/avatar/icons';
const props = withDefaults(
  defineProps<{
    name?: string;
    size?: number | string;
    src?: string;
  }>(),
  {
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
  <a-avatar :src="avatar" :size="size">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>
