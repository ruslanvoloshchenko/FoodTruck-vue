<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('load')
})
</script>

<template>
  <NavBar></NavBar>
  <main>
    <RouterView />
  </main>
</template>
