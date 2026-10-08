import { ref, watch } from 'vue'
// Composable: limits how often a fast-changing value updates (limiting events).
export function useDebounce(source, delay = 300) {
  const debounced = ref(source.value)
  let timer
  watch(source, (v) => {
    clearTimeout(timer)
    timer = setTimeout(() => (debounced.value = v), delay)
  })
  return debounced
}
