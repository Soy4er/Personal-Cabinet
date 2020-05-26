<template>
  <div class="container">
    <search-table />
    <table class="table">
      <header-table />
      <body-table />
    </table>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>


<script>
import HeaderTable from "./HeaderTable.vue";
import SearchTable from "./SearchTable.vue";
import BodyTable from "./BodyTable.vue";

export default {
  components: {
    HeaderTable,
    SearchTable,
    BodyTable
  }
};
</script>

<style lang="scss">
.table {
  width: 100%;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 15px;
}
</style>