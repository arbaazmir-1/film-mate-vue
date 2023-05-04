<template lang="pug">
h1.mt-20 home page  
</template>
  
  <script>
  import { reactive, toRefs } from 'vue'
  import { auth } from '../firebase'
  import router from '../router'
  
  
  export default {
    
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
  