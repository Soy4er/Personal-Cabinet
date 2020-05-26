import * as contact from '@/api/request.js';
import Vue from 'vue'

export default {
  actions: {
    async startApp(ctx) {
      const contacts = Vue.localStorage.get('contacts') ? await contact.getContacts() : JSON.parse(Vue.localStorage.get('contacts'))
      console.log(contacts);

      ctx.commit('updateContacts', contacts);
    },
  },
  mutations: {
    updateLS(state) {
      Vue.localStorage.set('contacts', '')
      Vue.localStorage.set('contacts', state.contacts ? JSON.stringify(state.contacts) : '')
      console.log('updateLS - '+Vue.localStorage.get('contacts'));
    },

    updateContacts(state, contacts) {
      console.log(contacts);

      state.contacts = contacts
      this.commit('table/updateLS');
    },

    updateSearch(state, contacts) {
      state.search = contacts
    }
  },
  state: {
    contacts: [],
    columns: [
      { id: 0, label: 'Name', name: 'name', width: 250, visible: true },
      { id: 1, label: 'Phone', name: 'phone', width: 200, visible: true },
      { id: 2, label: 'Email', name: 'email', width: 270, visible: true },
      { id: 3, label: 'Birthday', name: 'birthday', width: 110, visible: true },
    ],
    search: '',

  },
  getters: {
    allContacts(state) {
      return state.contacts
    },
    allColumns(state) {
      return state.columns
    },
    allSearch(state) {
      return state.search
    }
  }
}