import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userData = defineStore('userData', {
  
  state: () => ({
    user: {},
    loading: false,
    error: null
  }),
  getters: {
    getUser: (state) => {
      return state.user
    }
  },
  actions: {
    setUser: (state, user) => {
      console.log(user)
      state.user = user
    }
  
  }
})

