<template>
  <span>{{ content }}</span>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  content: {
    type: String,
  }
})

const { content } = toRefs(props);
</script>
