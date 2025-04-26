<script setup lang="ts">
import {UserOutlined, SyncOutlined, ExpandOutlined, SearchOutlined, BellOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <div class="color-white">
    <a-flex justify="space-between">
      <h2>Admin X</h2>
      <div>
        <a-space class="font-size-20px" :size="36">
          <BellOutlined/>
          <SearchOutlined/>
          <SyncOutlined/>
          <ExpandOutlined/>
          <a-flex align="center">
            <span class="mr-8px">格子惊蛰版</span>
            <a-dropdown>
              <a-avatar :size="44">
                <template #icon>
                  <UserOutlined/>
                </template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    个人中心
                  </a-menu-item>
                  <a-menu-item>
                    设置
                  </a-menu-item>
                  <a-menu-item>
                    退出
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-flex>
        </a-space>
      </div>
    </a-flex>
  </div>
</template>

<style scoped>

</style>