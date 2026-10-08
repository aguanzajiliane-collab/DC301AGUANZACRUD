<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'

const route = useRoute()
const router = useRouter()
const { addItem, updateItem, getItem } = useStore()
const editId = route.params.id ? Number(route.params.id) : null

const form = reactive({ name: '', category: 'Coffee', price: '', available: true })
const errors = ref({})

onMounted(() => {
  if (editId !== null) {
    const item = getItem(editId)
    if (item) Object.assign(form, item)
    else router.replace({ name: 'menu' })
  }
})

function validate() {
  const e = {}
  if (!form.name.trim()) e.name = 'Enter a name.'
  if (!form.category.trim()) e.category = 'Enter a category.'
  if (!(Number(form.price) > 0)) e.price = 'Price must be greater than 0.'
  errors.value = e
  return Object.keys(e).length === 0
}

function save() {
  if (!validate()) return
  const data = { name: form.name.trim(), category: form.category.trim(), price: Number(form.price), available: form.available }
  if (editId !== null) updateItem(editId, data)
  else addItem(data)
  router.push({ name: 'menu' })
}
</script>

<template>
  <h1>{{ editId !== null ? 'Edit menu item' : 'Add menu item' }}</h1>
  <form class="card form" @submit.prevent="save">
    <label>Name
      <input v-model="form.name" />
      <small v-if="errors.name" class="error">{{ errors.name }}</small>
    </label>
    <label>Category
      <input v-model="form.category" />
      <small v-if="errors.category" class="error">{{ errors.category }}</small>
    </label>
    <label>Price (₱)
      <input v-model="form.price" type="number" step="0.01" />
      <small v-if="errors.price" class="error">{{ errors.price }}</small>
    </label>
    <label class="check"><input v-model="form.available" type="checkbox" /> Available</label>
    <div class="row">
      <button class="btn" type="submit">Save item</button>
      <RouterLink class="btn ghost" to="/menu">Cancel</RouterLink>
    </div>
  </form>
</template>
