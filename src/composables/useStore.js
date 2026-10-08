import { useLocalStorage } from './useLocalStorage'

const seed = [
  { id: 1, name: 'Espresso', category: 'Coffee', price: 90, available: true },
  { id: 2, name: 'Cappuccino', category: 'Coffee', price: 130, available: true },
  { id: 3, name: 'Iced Latte', category: 'Coffee', price: 150, available: true },
  { id: 4, name: 'Butter Croissant', category: 'Pastry', price: 95, available: true }
]
// Shared state lives at module level so every page sees the same data.
const menu = useLocalStorage('cs-menu', seed)
const orders = useLocalStorage('cs-orders', [])
const nextId = (list) => list.reduce((m, x) => Math.max(m, x.id), 0) + 1

export function useStore() {
  // Menu CRUD
  const addItem = (item) => menu.value.push({ ...item, id: nextId(menu.value) })
  const updateItem = (id, changes) => {
    const i = menu.value.findIndex((m) => m.id === id)
    if (i !== -1) menu.value[i] = { ...menu.value[i], ...changes }
  }
  const removeItem = (id) => (menu.value = menu.value.filter((m) => m.id !== id))
  const getItem = (id) => menu.value.find((m) => m.id === id)

  // Order CRUD
  const addOrder = (order) => {
    const o = { ...order, id: nextId(orders.value), status: 'pending', createdAt: new Date().toISOString() }
    orders.value.push(o)
    return o
  }
  const setStatus = (id, status) => {
    const o = orders.value.find((x) => x.id === id)
    if (o) o.status = status
  }
  const removeOrder = (id) => (orders.value = orders.value.filter((o) => o.id !== id))
  const getOrder = (id) => orders.value.find((o) => o.id === id)

  return { menu, orders, addItem, updateItem, removeItem, getItem, addOrder, setStatus, removeOrder, getOrder }
}
