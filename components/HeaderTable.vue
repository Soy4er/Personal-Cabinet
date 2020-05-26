<template>
  <thead class="table-header">
    <tr class="table-header__block">
      <th class="table-header__item">
        <div
          class="item-checkbox"
          @click="allSelected()"
        ></div>
      </th>
      <th
        class="table-header__item"
        v-for="item in columns"
        :key="item.name"
        :style="{width: item.width+'px'}"
      >
        {{item.label}}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  methods: {

  },
  computed: {
    columns() {
      return this.$store.getters['table/allColumns'];
    }
  }
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