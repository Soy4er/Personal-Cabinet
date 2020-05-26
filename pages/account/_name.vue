<template>
  <div>
    <table-contacts />
  </div>
</template>

<script>
import TableContacts from '@/components/TableContacts.vue'

export default {
  middleware: 'auth',
  components: {
    TableContacts
  },
  async created() {
    this.$store.dispatch("table/startApp");
  }
}
</script>
