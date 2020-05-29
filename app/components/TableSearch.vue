<template>
  <input
    class="search"
    type="text"
    v-model="searchInput"
    placeholder="Search..."
    v-on:input="search"
  />
</template>

<script>
export default {
  data() {
    return {
      searchInput: []
    };
  },
  methods: {
    search() {
      this.$store.commit("table/updateSearch", this.searchInput);
    }
  },
  computed: {
    contacts() {
      return this.$store.getters["table/allContacts"];
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: $gray-600;
  color: $white;
  margin: 15px 0;
}
</style>