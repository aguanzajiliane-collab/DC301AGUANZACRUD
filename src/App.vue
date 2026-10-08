<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="top">
    <RouterLink to="/" class="brand">Grindhouse</RouterLink>
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/menu">Menu</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
    </nav>
  </header>
  <main class="page"><RouterView /></main>
</template>
