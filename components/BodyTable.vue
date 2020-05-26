<template>
  <tbody class="table-body">
    <tr class="table-body__block" v-for="item in contactsSearch" :key="item.id">
      <th class="table-body__item">
        <div class="item-checkbox"></div>
      </th>
      <th
        class="table-body__item"
        v-for="({name, width}, columnId) in columns.filter(({visible}) => visible)"
        :key="columnId"
        :style="{width: `${width}px`}"
      >
        <input type="text" :value="item[name]" @input="update(item.id, name, $event.target.value)" v-if="edit" @change="editData" />
         <!-- v-model="input[item.id][name]" -->
        <span v-else>{{item[name]}}</span>
      </th>
      <th class="table-body__item table-body__item--trash">
        <span>delete</span>
      </th>
    </tr>
  </tbody>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      edit: true
    };
  },
  methods: {
    update(id, name, value) {
      this.contacts.find({})
      console.log(name);

      console.log(value);

      // var clone = Object.assign([], myArray);
      // this.$emit('input', cloneDeep(this.local), v => set(v, key, value))
    },
    editData() {
      this.$store.commit('table/updateContacts', this.input);
    }
  },
  computed: {
    ...mapGetters({
      columns: 'table/allColumns',
      contacts: 'table/allContacts',
      search: 'table/allSearch',
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
      return input
    }
  },
};
</script>

<style lang="scss">
.table-body {
  &__block {
    display: flex;
    align-items: center;
    padding: 0 35px;
    min-height: 50px;

    &:nth-child(even) {
      background-color: $gray-200;
    }
    &:hover {
      background-color: $gray-100;
    }
  }
  &__item {
    margin-right: 30px;
    text-align: left;
    position: relative;
    display: block;
    align-items: center;

    &--trash {
      cursor: pointer;
    }
    &:first-child {
      width: auto;
    }
    &:last-child:not(.table-header__item--active) {
      margin-right: 0;
    }
    &--active {
      color: $primary;
    }
  }
}
</style>