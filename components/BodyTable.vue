<template>
  <tbody class="table-body">
    <tr class="table-body__block" v-for="item in contactsSearch" :key="item.id">
      <th class="table-body__item">
        <div
          class="item-checkbox"
          :class="{'item-checkbox--active': selectedRows.indexOf(item.id) >= 0}"
          @click="rowSelection(item.id)"
        ></div>
      </th>
      <th
        class="table-body__item"
        v-for="({name, width}, columnId) in columns.filter(({visible}) => visible)"
        :key="columnId"
        :style="{width: `${width}px`}"
      >
        <input
          type="text"
          :value="item[name]"
          @input="update(item.id, name, $event.target.value)"
          v-if="edit.id === item.id && edit.status"
        />
        <span v-else>{{item[name]}}</span>
      </th>
      <th class="table-body__item table-buttons">
        <div class="table-buttons__item table-buttons__edit" @click="editUpdate(item.id)">
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </div>
        <div class="table-buttons__item table-buttons__delete">
          <font-awesome-icon :icon="['far', 'trash-alt']" @click="showDeleteUpdate(item.id)" />
          <transition name="fade">
            <div class="confirm-deletion" v-if="showDelete.id === item.id && showDelete.status">
              <p>Are you sure you want to delete item?</p>
              <div class="confirm-deletion__button">
                <div
                  class="confirm-deletion__button-cancel btn"
                  @click="showDelete.status = false"
                >Cancel</div>
                <div
                  class="confirm-deletion__button-confirm btn btn--primary"
                  @click="trashContact(item.id)"
                >Confirm</div>
              </div>
            </div>
          </transition>
        </div>
      </th>
    </tr>
  </tbody>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      edit: { id: 0, status: false },
      showDelete: { id: 0, status: false }
    };
  },
  methods: {
    update(contactID, contactProp, contactValue) {
      this.$store.commit("table/updateContact", {
        contactID,
        contactProp,
        contactValue
      });
    },
    editUpdate(id) {
      const status =
        this.edit.id === id && this.edit.status === true ? false : true;
      this.edit = { id, status };
    },
    showDeleteUpdate(id) {
      const status =
        this.showDelete.id === id && this.showDelete.status === true
          ? false
          : true;
      this.showDelete = { id, status };
    },
    trashContact(id) {
      this.$store.commit("table/deleteContact", id);
    },
    rowSelection(rowID) {
      if (this.selectedRows.indexOf(rowID) < 0)
        this.$store.commit("table/selectRow", rowID);
      else this.$store.commit("table/unselectRow", rowID);
    },
  },
  computed: {
    ...mapGetters({
      columns: "table/getColumns",
      contacts: "table/getContacts",
      search: "table/getSearch",
      selectedRows: "table/getSelectedRows"
    }),
    contactsSearch() {
      let searchQuery = this.search,
        contacts = this.contacts;
      if (searchQuery) {
        searchQuery = searchQuery.toLowerCase().trim();
        return contacts.slice().filter(value => {
          return Object.values(value).some(e => {
            if (e == null || e === undefined) return false;
            return e
              .toString()
              .toLowerCase()
              .trim()
              .match(searchQuery);
          });
        });
      }

      return contacts;
    },
    input() {
      let contacts = this.contacts,
        input = [];
      contacts.forEach(element => {
        input[element.id] = [];
        for (const key in element) {
          input[element.id][key] = element[key];
        }
      });
      return input;
    }
  }
};
</script>

<style lang="scss">
.table-body {
  &__block {
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 50px;

    &:nth-child(even) {
      background-color: $gray-500;
    }
  }
  &__item {
    margin-right: 30px;
    text-align: left;
    position: relative;
    display: block;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }

    & input {
      width: 100%;
      background-color: initial;
      border: none;
      border-bottom: 1px solid;
      color: #fff;
    }
  }
}
</style>