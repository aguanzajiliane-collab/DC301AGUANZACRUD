<script setup>
import { computed } from 'vue'
import { useStore } from '../composables/useStore'
const { menu, orders } = useStore()

const stats = computed(() => {
  const today = new Date().toDateString()
  const todays = orders.value.filter((o) => new Date(o.createdAt).toDateString() === today)
  const sales = todays.filter((o) => o.status === 'served').reduce((s, o) => s + o.total, 0)
  return [
    { label: 'Menu items', value: menu.value.length },
    { label: 'Orders today', value: todays.length },
    { label: 'Pending orders', value: orders.value.filter((o) => o.status === 'pending').length },
    { label: 'Sales today', value: '₱' + sales.toFixed(2) }
  ]
})
</script>

<template>
  <h1>Dashboard</h1>
  <div class="grid">
    <div v-for="s in stats" :key="s.label" class="card stat">
      <p class="muted">{{ s.label }}</p>
      <strong>{{ s.value }}</strong>
    </div>
  </div>
  <div class="row top-gap">
    <RouterLink class="btn" to="/orders/new">New order</RouterLink>
    <RouterLink class="btn ghost" to="/menu/new">Add menu item</RouterLink>
  </div>
</template>
