<template>
  <table class="table">
    <table-header />
    <table-body />
  </table>
</template>


<script>
import TableHeader from "./TableHeader.vue";
import TableBody from "./TableBody.vue";

export default {
  components: {
    TableHeader,
    TableBody
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 0;
  background-color: $gray-600;
  color: $white;
  border-radius: 4px;
  position: relative;
}
</style>