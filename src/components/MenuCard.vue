<script setup>
// Child component: receives data through props, reports actions through emits.
defineProps({ item: { type: Object, required: true } })
defineEmits(['edit', 'remove'])
</script>

<template>
  <article class="card item">
    <div>
      <h3>{{ item.name }}</h3>
      <p class="muted">{{ item.category }}</p>
    </div>
    <div class="row">
      <strong>₱{{ Number(item.price).toFixed(2) }}</strong>
      <span class="badge" :class="item.available ? 'ok' : 'off'">
        {{ item.available ? 'Available' : 'Sold out' }}
      </span>
    </div>
    <div class="row">
      <button class="btn ghost" @click="$emit('edit', item.id)">Edit</button>
      <button class="btn danger" @click="$emit('remove', item.id)">Delete</button>
    </div>
  </article>
</template>
