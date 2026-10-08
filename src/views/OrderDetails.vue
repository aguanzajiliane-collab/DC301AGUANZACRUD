<script>
// Written with the Options API on purpose, to compare with the Composition API elsewhere.
import { useStore } from '../composables/useStore'
import formatMixin from '../mixins/formatMixin'

export default {
  name: 'OrderDetails',
  mixins: [formatMixin],
  data() {
    return { order: null }
  },
  computed: {
    itemCount() {
      return this.order ? this.order.items.reduce((s, i) => s + i.qty, 0) : 0
    }
  },
  created() {
    const { getOrder } = useStore()
    this.order = getOrder(Number(this.$route.params.id)) || null
  }
}
</script>

<template>
  <div v-if="order">
    <h1>Order #{{ order.id }}</h1>
    <div class="card form">
      <p><strong>{{ order.customer }}</strong> <span class="badge">{{ order.status }}</span></p>
      <p class="muted">{{ dateText(order.createdAt) }}</p>
      <ul class="plain">
        <li v-for="i in order.items" :key="i.id" class="row between">
          <span>{{ i.qty }} × {{ i.name }}</span><span>{{ money(i.price * i.qty) }}</span>
        </li>
      </ul>
      <p><strong>{{ itemCount }} items · {{ money(order.total) }}</strong></p>
      <RouterLink class="btn ghost" to="/orders">Back to orders</RouterLink>
    </div>
  </div>
  <p v-else>Order not found. <RouterLink to="/orders">Back to orders</RouterLink></p>
</template>
