<template>
  <header>
    <div>Logo</div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/Other">Other</router-link>
    </nav>
    <div>
      <router-link to="/profile">My profile</router-link>
    </div>
  </header>
</template>

<script setup></script>

<style lang="sass" scoped>
header
    width: 100%
    padding-block: 1rem
    padding-inline: 1rem

    display: flex
    justify-content: space-between
    align-items: center

    nav
        display: flex
        gap: 1rem
</style>
