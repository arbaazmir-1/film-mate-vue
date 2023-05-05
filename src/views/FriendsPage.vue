<template lang="pug">
.mt-20.bg-red-200.w-full.p-10.flex.flex-col.friendsPage(class="md:flex-row").overflow-y-auto
    .friendRequestList.bg-white.p-2.flex.flex-col(class="w-1/2").m-2 
        h1.text-2xl.font-bold.text-start.my-4.text-black Friend Requests
        ul.flex.flex-col.items-center.text-black(v-for="friends in friendRequestReceived")
            li.flex.items-center.w-full.p-2.rounded.shadow.md.m-1
                img(:src="friends.photoURL").rounded-full.w-10.h-10
                h1.text-xl.m-2 {{friends.displayName}}
                .buttons.ml-auto
                    button(@click="acceptFriendRequest(friends.uid)").p-2.bg-green-500.text-white.rounded.m-1 Accept
                    button(@click="rejectFriendRequest(friends.uid)").p-2.bg-red-500.text-white.rounded.m-1 Reject
    .friendList.bg-white.p-2.flex.flex-col(class="w-1/2").m-2 
        h1.text-2xl.font-bold.text-start.my-4.text-black My Friends
        ul.flex.flex-col.items-center.text-black(v-for="friends in friends")
            li.flex.items-center.w-full.p-2.border-b-2.border-gray-200
                img(:src="friends.photoURL").rounded-full.w-10.h-10
                h1.text-xl.m-2 {{friends.displayName}}
                button(@click="removeFriend(friends.uid)").p-2.bg-red-500.text-white.rounded Remove
            
</template>

<script>
import { reactive, toRefs,watchEffect } from 'vue'
import { userData } from '../stores/userState'
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
  arrayRemove,
  onSnapshot,

} from 'firebase/firestore'

export default {
    setup () {
        const state = reactive({
            friends: [],
            loading: false,
            error: null,
            friendRequestReceived: [],
        })
        const store = userData()
        const user = store.getUser

        //get the friends list
        const q = query(
            collection(db, 'users'),
            where('uid', '==', user.uid)
        )
        watchEffect((onInvalidate) => {
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((docPage) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(docPage.id, " => ", docPage.data());
                    //find the details of the friends and the friend request
                    for(let i=0;i<docPage.data().friendsRequestReceived.length;i++){
                        const friendReqRef = doc(db, 'users', docPage.data().friendsRequestReceived[i])
                        console.log(friendReqRef)
                        getDoc(friendReqRef).then((docSnap) => {
                            if (docSnap.exists()) {
                                // console.log("Document data:", docSnap.data());
                                //if the friend request is not already in the list in the state.friendsRequestReceived array then add it
                                // the storing format is { uid: 'uid', displayName: 'displayName', photoURL: 'photoURL' }
                                if(!state.friendRequestReceived.some(friend => friend.uid === docSnap.data().uid)){
                                    state.friendRequestReceived.push({
                                        uid: docSnap.data().uid,
                                        displayName: docSnap.data().name,
                                        photoURL: docSnap.data().photoURL
                                    })
                                }
                                
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        })
                    }
                    
                    
                    
                    
                });
            });
            onInvalidate(() => unsubscribe())
        })

        console.log(state)
        


        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>
.friendsPage{
    height: 90vh;
}

</style>