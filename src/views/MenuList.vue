<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import { useDebounce } from '../composables/useDebounce'
import MenuCard from '../components/MenuCard.vue'

const router = useRouter()
const { menu, removeItem } = useStore()
const search = ref('')
const category = ref('All')
const query = useDebounce(search, 300) // filter only runs after typing pauses

const categories = computed(() => ['All', ...new Set(menu.value.map((m) => m.category))])
const filtered = computed(() =>
  menu.value.filter(
    (m) =>
      m.name.toLowerCase().includes(query.value.trim().toLowerCase()) &&
      (category.value === 'All' || m.category === category.value)
  )
)

const goEdit = (id) => router.push({ name: 'menu-edit', params: { id } })
const remove = (id) => {
  if (confirm('Delete this menu item?')) removeItem(id)
}
</script>

<template>
  <div class="row between">
    <h1>Menu</h1>
    <RouterLink class="btn" to="/menu/new">Add item</RouterLink>
  </div>
  <div class="row">
    <input v-model="search" placeholder="Search menu" />
    <select v-model="category">
      <option v-for="c in categories" :key="c">{{ c }}</option>
    </select>
  </div>
  <div class="grid top-gap">
    <MenuCard v-for="m in filtered" :key="m.id" :item="m" @edit="goEdit" @remove="remove" />
  </div>
  <p v-if="!filtered.length" class="muted top-gap">No items match. Try another search or add a new item.</p>
</template>
