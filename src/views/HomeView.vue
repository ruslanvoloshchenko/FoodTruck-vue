<script setup>
import { ref, watch, onMounted } from 'vue'
import SliderBtn from '@/components/ui/SliderBtn.vue'

const isChecked = ref(false)

let mql

onMounted(() => {
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  if (mql.matches) {
    isChecked.value = true
  } else {
    isChecked.value = false
  }
})

const setBgColorDark = () => {
  document.body.style.setProperty('--color-background', 'var(--vt-c-black)')
  document.body.style.setProperty('--color-background-soft', 'var(--vt-c-black-soft)')
  document.body.style.setProperty('--color-background-mute', 'var(--vt-c-black-mute)')
  document.body.style.setProperty('--color-border', 'var(--vt-c-divider-dark-2)')
  document.body.style.setProperty('--color-border-hover', 'var(--vt-c-divider-dark-1)')
  document.body.style.setProperty('--color-heading', 'var(--vt-c-text-dark-1)')
  document.body.style.setProperty('--color-text', 'var(--vt-c-text-dark-2)')
}

const setBgColorLight = () => {
  document.body.style.setProperty('--color-background', 'var(--vt-c-white)')
  document.body.style.setProperty('--color-background-soft', 'var(--vt-c-white-soft)')
  document.body.style.setProperty('--color-background-mute', 'var(--vt-c-white-mute)')
  document.body.style.setProperty('--color-border', 'var(--vt-c-divider-light-2)')
  document.body.style.setProperty('--color-border-hover', 'var(--vt-c-divider-light-1)')
  document.body.style.setProperty('--color-heading', 'var(--vt-c-text-light-1)')
  document.body.style.setProperty('--color-text', 'var(--vt-c-text-light-2)')
}
watch(isChecked, (value) => {
  if (value) {
    setBgColorDark()
  } else {
    setBgColorLight()
  }
})
</script>

<template>
  <div class="home">
    <div>
      <h1>H1 Headers</h1>
      <h2>H2 Headers</h2>
      <h3>H3 Headers</h3>
      <h4>H4 Headers</h4>
      <h5>H5 Headers</h5>
    </div>
    <div class="slider">
      <SliderBtn v-model="isChecked" />
      <span>{{ isChecked ? 'dark-theme' : 'light-theme' }}</span>
    </div>
    <div>
      <button class="btn-blue">Action</button>
      <button class="btn-green">Accept</button>
      <button class="btn-red">Delete</button>
      <button class="btn-gray">Reset</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.home
  display: flex
  flex-direction: column
  gap: 1rem

  .slider
    display: flex
    gap: 1rem
</style>
