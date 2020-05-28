<template>
  <div class="buttons-block">
    <div class="buttons-block__item buttons-block__item-create" @click="createContact">
      <font-awesome-icon :icon="['fas', 'plus']" />Create a new contact
    </div>
    <div
      class="buttons-block__item buttons-block__item-delete"
      @click="deleteContacts"
      v-if="this.selectedRows.length > 0"
    >
      <font-awesome-icon :icon="['far', 'trash-alt']" />Delete all selected rows
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    createContact() {
      try {
        const lastID = this.contacts.slice().sort(function(a, b) {
            return b.id - a.id;
          })[0].id,
          newEdit = { id: lastID + 1, status: true };
        this.$store.commit("table/createContact");
        this.$store.commit("table/updateEdit", newEdit);
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    deleteContacts() {
      try {
        const countSelectedRows = this.selectedRows.length;
        this.$store.commit("table/deleteContacts");
        this.$toast.success(
          `Successfully delete ${countSelectedRows} contacts`
        );
      } catch (e) {
        this.$toast.error("Oops...Something went wrong");
      }
    }
  },
  computed: {
    ...mapGetters({
      contacts: "table/getContacts",
      selectedRows: "table/getSelectedRows"
    })
  },
};
</script>

<style lang="scss" scoped>
.buttons-block {
  position: absolute;
  top: 100px;
  left: 1260px;
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