<template lang="pug">
//full screen navbar
.flex.w-screen.h-20.bg-white.justify-between.items-center.p-2.fixed.top-0.z-50.shadow-md 
    router-link(to="/").logo.flex.items-center.ml-8
        h1.text-2xl.font-bold.text-blue-500 Film
        h1.text-2xl.font-bold.text-gray-700 Mate
    
    //menu items, create group, search friend, watchlist
    .hidden.items-center.mr-8(class="md:flex").text-black
        ul.flex.items-center
            li.mr-8
                router-link(to="/home") Home
            
            li.mr-8
                router-link(to="/search") Search
            li.mr-8
                router-link(to="/friends") Friends
            li.mr-8
                router-link(to="/profile") Profile
            li.mr-8
    button(@click="showModal").p-2.bg-red-500.text-white.rounded Logout
    modal(v-if="modalVisible" @closeModal="modalVisible = false" :message="message" :buttonName="buttonName" :method="logout" :title="'Logout'")
//in mobile view a bottom navbar 
div.flex.items-center.bg-white.fixed.bottom-0.left-0.right-0.h-16.p-2.text-black(class="md:hidden").z-50.border-t-2.border-gray-200
    ul.flex.items-center(class="justify-evenly w-full h-full")
        li
            router-link(to="/home") Home
        li
            router-link(to="/search") Search
        li
            router-link(to="/friends") Friends
        li
            router-link(to="/profile") Profile
        
   
</template>

<script>
import { reactive, toRefs } from 'vue'
import Modal from '../components/ModalComponent.vue'
import { logout } from '../methods'
import router from '../router'

export default {
  components: {
    Modal
  },
  setup() {
    const state = reactive({
      modalVisible: false
    })
    const message = 'Are you sure you want to logout?'
    const buttonName = 'Logout'

    const showModal = () => {
      state.modalVisible = true
    }
    //get current url 

    return {
      ...toRefs(state),
      showModal,
      message,
      buttonName,
      logout
    }
  }
}
</script>

<style>
/* styles for the navbar */
</style>
