<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../composables/useStore'
const { orders, setStatus, removeOrder } = useStore()
const filter = ref('all')
const statuses = ['pending', 'preparing', 'served']
const shown = computed(() =>
  [...orders.value].reverse().filter((o) => filter.value === 'all' || o.status === filter.value)
)
const remove = (id) => {
  if (confirm('Delete this order?')) removeOrder(id)
}
</script>

<template>
  <div class="row between">
    <h1>Orders</h1>
    <RouterLink class="btn" to="/orders/new">New order</RouterLink>
  </div>
  <select v-model="filter">
    <option value="all">All statuses</option>
    <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
  </select>
  <div class="card top-gap table-wrap">
    <table v-if="shown.length">
      <thead><tr><th>#</th><th>Customer</th><th>Total</th><th>Status</th><th></th></tr></thead>
      <tbody>
        <tr v-for="o in shown" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.customer }}</td>
          <td>₱{{ o.total.toFixed(2) }}</td>
          <td>
            <select :value="o.status" @change="setStatus(o.id, $event.target.value)">
              <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
          </td>
          <td class="row">
            <RouterLink class="btn ghost" :to="{ name: 'order-details', params: { id: o.id } }">View</RouterLink>
            <button class="btn danger" @click="remove(o.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="muted">No orders yet. Create the first one.</p>
  </div>
</template>
