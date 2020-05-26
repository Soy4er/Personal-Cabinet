<template>
  <input type="text" v-model="searchInput" placeholder="Search..." v-on:input="search">
</template>

<script>
export default {
  data() {
    return {
      searchInput: []
    }
  },
  methods: {
    search() {
      this.$store.commit('table/updateSearch', this.searchInput);
    }
  },
  computed: {
    contacts() {
      return this.$store.getters['table/allContacts'];
    },
  },
};
</script>

<style lang="scss">
.table-header {
  display: block;
  border-bottom: 1px solid $gray-300;
  &__block {
    padding: 0 35px;
    display: flex;
    align-items: center;
    min-height: 55px;
  }
  &__item {
    margin-right: 30px;
    text-align: left;
    font-weight: 600;
    &:first-child {
      width: auto;
    }
    &:last-child:not(.table-header__item--active) {
      margin-right: 0;
    }
    &--active {
      color: $primary;
      display: flex;
      align-items: center;
      & svg {
        margin-left: 5px;
      }
    }
  }
}
</style>