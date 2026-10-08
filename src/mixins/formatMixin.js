// Mixin: shared formatting helpers for Options API components.
export default {
  methods: {
    money(n) {
      return '₱' + Number(n).toFixed(2)
    },
    dateText(iso) {
      return new Date(iso).toLocaleString()
    }
  }
}
