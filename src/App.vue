<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
</script>

<template>
  <NavBar></NavBar>
  <main>
    <RouterView />
  </main>
</template>
