<template>
  <span v-if="!isEditable" @dblclick="handleClick">{{ content }}</span>
  <span v-else>
    <input
    type="text"
    v-model="inputText"
    :style="{ width: inputWidth + 'px' }"
    @input="updateWidth"
    ref="inputField"
    :placeholder="content"
  />
  </span>
  
</template>

<script setup>
import { ref, onMounted, watch, defineProps, toRefs, reactive } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  isEditable: {
    type: Boolean,
    default: false
  }
})

const { content, isEditable } = toRefs(props);

const state = reactive({
  str: content.value
})

const handleClick = (e) => {
  isEditable.value = true
}

const handleChange = (e) => {
  str.value = e.target.value
}

const inputText = ref('');
const inputWidth = ref(0);
const inputField = ref(null);

const updateWidth = () => {
  if (inputField.value) {
    inputWidth.value = inputField.value.scrollWidth;
  }
};

onMounted(() => {
  updateWidth();
});

watch(inputText, () => {
  updateWidth();
});
</script>

<style scoped>
/* Optional: Add some styling */
input {
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  max-width: 200px;
}
</style>