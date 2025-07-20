<script setup lang="ts">
import Fullscreen from '@/layout/Navbar/components/Fullscreen.vue';
import Notice from '@/layout/Navbar/components/Notice.vue';
import Github from '@/layout/Navbar/components/Github.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import Search from '@/layout/Navbar/components/Search.vue';
import Theme from '@/layout/Navbar/components/Theme.vue';
import Translate from '@/layout/Navbar/components/Translate.vue';
import User from '@/layout/Navbar/components/User.vue';
import logoPath from '@/assets/images/logo.jpg';
</script>

<template>
  <div class="flex items-center justify-between px-20px">
    <a-flex>
      <h1 class="flex items-center">
        <img class="size-30px rounded-5px" :src="logoPath" alt="Admin x" />
        <div class="ml-16px font-size-18px">
          <span>Admin</span>
          <span class="color-[var(--color-primary)]"> x</span>
        </div>
        <a-tag class="ml-8px" color="magenta">大暑版 (Version 0.0.1)</a-tag>
      </h1>
      <div class="mx-55px overflow-hidden">
        <slot></slot>
      </div>
    </a-flex>
    <div class="flex items-center">
      <a-space class="hidden lg:flex font-size-18px" :size="32">
        <Github />
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
