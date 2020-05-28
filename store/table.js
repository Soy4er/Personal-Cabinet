import * as contact from '@/api/request.js';
import Vue from 'vue'

export default {
  actions: {
    async startApp(ctx) {
      const contacts = Vue.localStorage.get('contacts') ? JSON.parse(Vue.localStorage.get('contacts')) : await contact.getContacts()
      ctx.commit('updateContacts', contacts);
    },
  },
  mutations: {
    updateLS(state) {
      Vue.localStorage.set('contacts', '')
      Vue.localStorage.set('contacts', state.contacts ? JSON.stringify(state.contacts) : '')
    },

    updateContacts(state, contacts) {
      state.contacts = contacts
      this.commit('table/updateLS');
    },

    createContact(state) {
      const date = new Date().getTime(),
        lastID = state.contacts.slice().sort(function (a, b) { return b.id - a.id })[0].id
      state.contacts.push({ id: lastID + 1, created_at: date });
    },

    updateContact(state, { contactID, contactProp, contactValue }) {
      let contact = state.contacts.find(({ id }) => id === contactID)
      contact[contactProp] = contactValue
      this.commit('table/updateLS');
    },

    updateSearch(state, contacts) {
      state.search = contacts
    },

    deleteContact(state, contactID) {
      const contact = state.contacts.find(({ id }) => id === contactID)
      if (contact) state.contacts.splice(contact.id, 1)
      this.commit('table/updateLS');
    },

    deleteContacts(state) {
      // Iterating through an array of all the selected rows, searching for contacts with IDs from the array, and deleting them.
      state.selectedRows.forEach(function (item) {
        const contact = state.contacts.find(({ id }) => id === item),
          position = state.contacts.indexOf(contact);
        if (position >= 0) state.contacts.splice(position, 1);
      });
      state.selectedRows = [];
    },

    selectRow(state, rowID) {
      state.selectedRows.push(rowID)
    },

    unselectRow(state, rowID) {
      const id = state.selectedRows.indexOf(rowID);
      if (id >= 0) state.selectedRows.splice(id, 1);
    },

    selectAllRows(state, selectedRows) {
      for (const item in selectedRows) {
        if (state.selectedRows.indexOf(selectedRows[item].id) < 0)
          state.selectedRows.push(selectedRows[item].id)
      }
    },

    unselectAllRows(state) {
      state.selectedRows = []
    },

    updateEdit(state, newEdit) {
      state.edit = newEdit
    }
  },
  state: {
    contacts: [],
    columns: [
      { id: 0, label: 'Name', name: 'name', width: 240, visible: true },
      { id: 1, label: 'Phone', name: 'phone', width: 210, visible: true },
      { id: 2, label: 'Email', name: 'email', width: 300, visible: true },
      { id: 3, label: 'Birthday', name: 'birthday', width: 150, visible: true },
    ],
    search: '',
    selectedRows: [],
    edit: { id: 0, status: false },
  },
  getters: {
    getContacts(state) {
      return state.contacts
    },
    getColumns(state) {
      return state.columns
    },
    getSearch(state) {
      return state.search
    },
    getSelectedRows(state) {
      return state.selectedRows
    },
    getEdit(state) {
      return state.edit
    }
  }
}