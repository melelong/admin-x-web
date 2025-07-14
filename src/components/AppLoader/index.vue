<template>
  <div class="loading-container w-screen h-screen">
    <div class="bouncing-letters">
      <span
        v-for="(letter, index) in text"
        :key="index"
        :style="{
          animationDelay: `${index * 0.1}s`,
          color: colors[index % colors.length],
        }"
        class="letter"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref<string>('Admin x');
const colors = ref<string[]>([
  'var(--color-text)',
  'var(--color-text)',
  'var(--color-text)',
  'var(--color-text)',
  'var(--color-text)',
  'var(--color-text)',
  'var(--color-primary)',
]);
</script>

<style scoped lang="less">
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-elevated);
}

.bouncing-letters {
  display: flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 12px;
  text-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}

.letter {
  transform-origin: bottom;
  animation: bounce 0.8s ease infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0) scaleY(1);
  }

  30% {
    transform: translateY(-20px) scaleY(1.1);
  }

  60% {
    transform: translateY(-10px) scaleY(0.9);
  }

  100% {
    transform: translateY(-25px) scaleY(1.2);
  }
}
</style>
