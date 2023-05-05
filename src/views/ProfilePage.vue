<template lang="pug">

.userPage.mt-20.text-white.flex.justify-center.p-10(class="md:flex-row").flex-col.overflow-y-auto
        .userPageLeft.flex.flex-col.items-center(class="md:w-1/3 md:items-start").p-10.bg-gradient-to-r.from-blue-500.to-blue-700.w-full
            img(:src="user.photoURL").rounded-full.w-40.h-40.my-4
            h1.text-2xl.font-bold.mt-4 {{user.displayName}}
            h2.my-2 {{user.email}}
            button(@click="showModal").p-2.bg-red-500.text-white.rounded.w-full Logout
        .friendList(class="md:w-2/3").bg-white.shadow-md.rounded.w-full.p-10.overflow-y-auto
            h1.text-2xl.font-bold.text-start.my-4.text-black My Friends
            ul.flex.flex-col.items-center.text-black
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
                li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                    img(:src="user.photoURL").rounded-full.w-10.h-10
                    h1.text-xl.m-2 {{user.displayName}}
    
modal(v-if="modalVisible" @closeModal="modalVisible = false" :message="message" :buttonName="buttonName" :method="logout" :title="'Logout'" :modalVisible="modalVisible")
    
      
</template>
    
    <script>
    import Modal from '../components/ModalComponent.vue'
    import { userData } from '../stores/userState'
    import { reactive, toRefs ,ref,onMounted,watch} from 'vue'
    import { logout } from '../methods'
    export default {
      components: {
        Modal
      },
      setup() {
        const state = reactive({
          modalVisible: false
        })
    
        const userDataStore = userData()
        const user = userDataStore.getUser

        watch(user, (newVal, oldVal) => {
            console.log(newVal)
        })
    
        const message = 'Are you sure you want to logout?'
        const buttonName = 'Logout'
        const showModal = () => {
          state.modalVisible = true
        }
        const title = 'Logout'
    
        return {
          ...toRefs(state),
          user,
          showModal,
          message,
          buttonName,
          title,
        logout
        }
      }
    }
    </script>
    
    <style lang="scss" scoped>
    .userPage{
        height: 55vh;
        @media   (max-width: 768px) {
            height: fit-content;
            margin: 5em 0px;
        }
    
        .userPageLeft{
            @media   (max-width: 768px) {
                width: 100%;
                height: 30em;
            }
        }
        .friendList{
            @media   (max-width: 768px) {
                margin-top: 10px;
                width: 100%;
                height: 30em;
            }
        }
            
        
    }
    </style>