<template>
  <div class="container">
    <breadcrumb />
    <search-table />
    <table class="table">
      <header-table />
      <body-table />
      <table-buttons />
    </table>
  </div>
</template>


<script>
import HeaderTable from "./HeaderTable.vue";
import SearchTable from "./SearchTable.vue";
import BodyTable from "./BodyTable.vue";
import TableButtons from '@/components/TableButtons.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  components: {
    HeaderTable,
    SearchTable,
    BodyTable,
    TableButtons,
    Breadcrumb
  }
};
</script>

<style lang="scss">
.table {
  width: 100%;
  border-spacing: 0;
  background-color: $gray-600;
  color: $white;
  border-radius: 4px;
  position: relative;
}
</style>