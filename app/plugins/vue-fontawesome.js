import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPencilAlt, faTrashAlt, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)