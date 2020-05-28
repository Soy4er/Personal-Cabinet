<template>
  <div class="container">
    <breadcrumb />
    <table-search />
    <table-contacts />
    <table-buttons />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import TableContacts from '@/components/TableContacts.vue'
import TableSearch from "@/components/TableSearch.vue";
import TableButtons from '@/components/TableButtons.vue'

export default {
  head: {
    title: 'Личный кабинет'
  },
  middleware: 'auth',
  components: {
    Breadcrumb,
    TableContacts,
    TableSearch,
    TableButtons,
  },
  async created() {
    this.$store.dispatch("table/startApp");
  }
}
</script>
