<script setup lang="ts">
import { useScreenSize } from '@/hooks/modules/useScreenSize';
import Fullscreen from '@/layout/Navbar/components/Fullscreen.vue';
import Notice from '@/layout/Navbar/components/Notice.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import Search from '@/layout/Navbar/components/Search.vue';
import Theme from '@/layout/Navbar/components/Theme.vue';
import Translate from '@/layout/Navbar/components/Translate.vue';
import User from '@/layout/Navbar/components/User.vue';

const screenSize = useScreenSize();
const isMobile = computed(() => screenSize.isMobile.value);
</script>

<template>
  <div>
    <a-flex justify="space-between">
      <a-flex>
        <h1 class="ml-17px tracking-[3px]">Admin X</h1>
        <div class="mx-30px max-w-40vw overflow-x-scroll">
          <slot></slot>
        </div>
      </a-flex>
      <div class="flex items-center">
        <a-space v-if="!isMobile" class="font-size-18px" :size="44">
          <Notice />
          <Search />
          <Theme />
          <Reload />
          <Translate />
          <Fullscreen />
        </a-space>
        <User />
      </div>
    </a-flex>
  </div>
</template>
