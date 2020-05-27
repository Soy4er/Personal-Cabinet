<template>
  <tfootet class="buttons-block">
    <tr class="buttons-block__item buttons-block__item-create" @click="editUpdate">
      <font-awesome-icon :icon="['fas', 'plus']" />Create a new contact
    </tr>
    <tr class="buttons-block__item buttons-block__item-delete" @click="deleteContacts">
      <font-awesome-icon :icon="['far', 'trash-alt']" />Delete all selected rows
    </tr>
  </tfootet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    deleteContacts() {
      this.$store.commit('table/deleteContacts');
    }
  },
  computed: {
    ...mapGetters({
      edit: 'table/getEdit',
    }),
  }
}
</script>

<style lang="scss">
.buttons-block {
  position: absolute;
  top: 0;
  left: 1180px;
  user-select: none;
  outline: none;
  &__item {
    width: 40px;
    height: 40px;
    overflow: hidden;
    background-color: $primary;
    color: $white;
    border-radius: 20px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    & svg {
      margin: 0 13px;
    }
    &-create:hover {
      width: 205px;
    }
    &-delete:hover {
      width: 225px;
    }
  }
}
</style>