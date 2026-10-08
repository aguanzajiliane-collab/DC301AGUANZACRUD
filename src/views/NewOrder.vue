<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'

const router = useRouter()
const { menu, addOrder } = useStore()
const customer = ref('')
const qty = ref({}) // item id -> quantity
const error = ref('')

const available = computed(() => menu.value.filter((m) => m.available))
const lines = computed(() =>
  available.value
    .filter((m) => qty.value[m.id] > 0)
    .map((m) => ({ id: m.id, name: m.name, price: m.price, qty: Number(qty.value[m.id]) }))
)
const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0))

function submit() {
  if (!customer.value.trim()) return (error.value = 'Enter a customer name.')
  if (!lines.value.length) return (error.value = 'Add at least one item.')
  const order = addOrder({ customer: customer.value.trim(), items: lines.value, total: total.value })
  router.push({ name: 'order-details', params: { id: order.id } })
}
</script>

<template>
  <h1>New order</h1>
  <form class="card form" @submit.prevent="submit">
    <label>Customer name <input v-model="customer" /></label>
    <div v-for="m in available" :key="m.id" class="row between">
      <span>{{ m.name }} <span class="muted">₱{{ m.price.toFixed(2) }}</span></span>
      <input v-model.number="qty[m.id]" type="number" min="0" class="qty" placeholder="0" />
    </div>
    <p v-if="!available.length" class="muted">No available items. Add items on the menu page first.</p>
    <p><strong>Total: ₱{{ total.toFixed(2) }}</strong></p>
    <small v-if="error" class="error">{{ error }}</small>
    <div class="row">
      <button class="btn" type="submit">Place order</button>
      <RouterLink class="btn ghost" to="/orders">Cancel</RouterLink>
    </div>
  </form>
</template>
