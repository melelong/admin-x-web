<script setup lang="ts">
import {ref} from 'vue'

const visible = ref(false)
const modalTile = ref('')
const showModal = ({title}) => {
  modalTile.value = title
  visible.value = true;
};

const handleOk = () => {

}

defineExpose({
  showModal,
})
</script>

<template>
  <a-modal v-model:open="visible" :title="modalTile" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>