import { ref, watch } from 'vue'
// Composable: a ref that is saved to and loaded from localStorage.
export function useLocalStorage(key, initial) {
  let start = initial
  try {
    const saved = localStorage.getItem(key)
    if (saved !== null) start = JSON.parse(saved)
  } catch { /* fall back to initial */ }
  const data = ref(start)
  watch(data, (v) => localStorage.setItem(key, JSON.stringify(v)), { deep: true })
  return data
}
