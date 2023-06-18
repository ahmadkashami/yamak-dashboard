import { createStore } from 'vuex'
import axios from '@axios'
import userActions from '@/store/userActions'
import companyActions from '@/store/companyActions'
import serviceActions from '@/store/serviceActions'


export const  store = createStore({
  state: {
    userData: localStorage.getItem('userData'),
  },
  mutations: {
    UPDATE_USER_USER_DATA(state, value) {
      state.userData = value
    },
  },
  actions: {
    ...userActions,
    ...companyActions,
    ...serviceActions
  },
  modules: {},
})

