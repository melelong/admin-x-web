<script setup lang="ts">
import { useScreenSize } from '@/hooks/modules/useScreenSize';
import Fullscreen from '@/layout/Navbar/components/Fullscreen.vue';
import Notice from '@/layout/Navbar/components/Notice.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import Search from '@/layout/Navbar/components/Search.vue';
import Theme from '@/layout/Navbar/components/Theme.vue';
import Translate from '@/layout/Navbar/components/Translate.vue';
import User from '@/layout/Navbar/components/User.vue';
import logoPath from '@/assets/images/logo.jpg';

const screenSize = useScreenSize();
const isMobile = computed(() => screenSize.isMobile.value);
</script>

<template>
  <div class="flex items-center justify-between">
    <a-flex>
      <h1 class="flex items-center ml-17px tracking-[3px]">
        <img class="size-32px rounded-5px" :src="logoPath" alt="Admin x" />
        <span class="font-size-18px ml-16px font-400">Admin x</span>
      </h1>
      <div v-if="!isMobile" class="ml-55px w-500px overflow-hidden">
        <slot></slot>
      </div>
    </a-flex>
    <div class="flex items-center">
      <a-space v-if="!isMobile" class="font-size-18px" :size="32">
        <Notice />
        <Search />
        <Theme />
        <Reload />
        <Translate />
        <Fullscreen />
      </a-space>
      <User />
    </div>
  </div>
</template>
