<template lang="pug">
.searchPage.mt-20.w-full.h-screen.p-10.flex.flex-col.items-center
    .searchContainer.flex.w-full(class="md:w-1/2")
        input(type="text" placeholder="Search for a friend" class="w-full p-2 rounded-md border-2 border-gray-200" :value="searchQuery" @input="searchQuery = $event.target.value")
        button(@click="searchFriend").p-2.bg-blue-500.text-white.rounded {{ searchQuery ? 'Search' : 'Cancel'  }}
    .searchResults.flex.flex-col.items-start.w-full(class="md:w-1/2").bg-white.overflow-y-auto.my-10
        h1.text-2xl.font-bold.text-start.my-4.text-black(v-if="searchResults.length > 0") Search Results
        .container(v-for="arr in searchResults" v-if="searchResults.length > 0")
            .flex.items-center.w-full.p-2.rounded.shadow-md.my-2
                img(:src="arr.photoUrl").rounded-full.w-10.h-10
                h1.text-xl.m-2 {{arr.name}}
                button(@click="addFriend(arr.uid)" class="ml-auto" :disabled="arr.requestSent").p-2.bg-blue-500.text-white.rounded {{arr.requestSent ? 'Request Sent' : 'Add Friend'}}
    .loadingData.flex.flex-col.items-center.w-full(class="md:w-1/2" v-if="loading").bg-white.overflow-y-auto.my-10
        h1.text-2xl.font-bold.text-start.my-4.text-black Loading...
    .errorData.flex.flex-col.items-center.w-full(class="md:w-1/2" v-if="error").bg-white.overflow-y-auto.my-10
        h1.text-2xl.font-bold.text-start.my-4.text-black {{error}}
modal(v-if="modalVisible" @closeModal="modalVisible = false" :message="message" :buttonName="buttonName" :method="closeModal" :title="title" :cancelBtnNam="cancelBtnName" )
        
            
       
</template>

<script>
import { reactive, toRefs } from 'vue'
import { userData } from '../stores/userState'
import { ref } from 'vue'
import { db } from '../firebase'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import Modal from '../components/ModalComponent.vue'

export default {
    components: {
        Modal
    },
  setup() {
    const state = reactive({
      searchQuery: '',
      searchResults: [],
      loading: false,
      error: null,
      modalVisible: false
      
    })
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }
    const store = userData()
    const user = store.getUser

    const searchFriend = () => {
        //clear the error
        state.error = null
        //clear the search results
        state.searchResults = []
      if (state.searchQuery) {
        //check if query is an email
        if (validateEmail(state.searchQuery)) {
          //search for the friend
          //get the user collection
          const q = query(
            collection(db, 'users'),
            where('email', '==', state.searchQuery)
          )
          getDocs(q)
            .then((querySnapshot) => {
              if (querySnapshot.empty) {
                //no user found
                state.error = 'No user found'
              } else {
                //user found
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, ' => ', doc.data())
                  
                  //check the user is not the current user
                    if (doc.data().email !== user.email) {
                        state.searchResults.push(
                            {
                                name: doc.data().name,
                                photoUrl: doc.data().photoURL,
                                uid: doc.data().uid,
                                requestSent: doc.data().friendsRequestReceived.includes(user.uid)
                            }
                        )
                    }
                })
                if(state.searchResults.length === 0){
                    state.error = 'No user found'
                }
                console.log(state.searchResults)
                
              }
            })
            .catch((error) => {
              console.log('Error getting documents: ', error)
            })
         
        } else {
          state.error = 'Please enter a valid email'
        }
      } else {
        //clear the search results
        state.searchResults = []
      }
    }
    const message = ' Friend request sent'
    const buttonName = 'Ok'
    const title = 'Friend Request Sent'
    const cancelBtnName = 'Close'
    const showModal = () => {
      state.modalVisible = true
    }
    const closeModal = () => {
      state.modalVisible = false
    }
    const addFriend = (uid) => {
      //check if the user is already a friend
        const userRef = doc(db, 'users', user.uid)
        getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
                // doc.data() will be undefined in this case
                console.log("Document data:", docSnap.data());
                //check if the user is already a friend
                if(docSnap.data().friends.includes(uid)){
                    state.error = 'User is already a friend'
                }else{
                    //add the user to the friends request send and add the current user to the user's friends request list
                    updateDoc(userRef, {
                        friendsRequestSend: arrayUnion(uid)
                    })
                    const userRef2 = doc(db, 'users', uid)
                    updateDoc(userRef2, {
                        friendsRequestReceived: arrayUnion(user.uid)
                    })
                    //show the modal
                    showModal()
                    //update the search results array
                    state.searchResults.forEach((arr)=>{
                        if(arr.uid === uid){
                            arr.requestSent = true
                        }
                    })


                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    

    return {
      ...toRefs(state),
      user,
      searchFriend,
      addFriend,
        message,
        buttonName,
        showModal,
        closeModal,
        title,
        cancelBtnName
    }
  }
}
</script>

<style lang="scss" scoped></style>
