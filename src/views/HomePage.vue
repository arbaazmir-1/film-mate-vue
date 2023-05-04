<template>
    <div>
      
      <navbar-component />
      <div class="">

      </div>
    </div>
  </template>
  
  <script>
  import { reactive, toRefs } from 'vue'
  import { auth } from '../firebase'
  import router from '../router'
  import NavbarComponent from '../components/NavbarComponent.vue'
  
  export default {
    components: {
      NavbarComponent,
    },
    setup() {
      const state = reactive({
        user: null,
      })
  
      auth.onAuthStateChanged((user) => {
        if (user) {
          state.user = user
        } else {
          router.push({ name: 'LoginPage' })
        }
      })
  
      
  
      return {
        ...toRefs(state),
        
      }
    },
  }
  </script>
  
  <style lang="scss" scoped></style>
  