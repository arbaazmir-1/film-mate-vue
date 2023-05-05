<template lang="pug">
.login-page.w-screen.h-screen.flex.items-center(class="md:flex-row   justify-center  flex-col-reverse")
    .h-screen(class="px-10 md:w-1/2 md:p-24 flex flex-col  md:justify-center  ")
        h1.text-4xl.text-white.font-bold.mb-4 Welcome to
          span.text-blue-500.font-bold Film
          span.text-gray-700.font-bold Mate
        p.text-white.mb-4  Make group movie nights easy with group watch list and voting.
          | Make your own watch list and share it with your friends.
          | Login with Google to get started.
  
        button(@click="formAction" class="text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 animated-bg")
          | Login with Google
  
    .h-screen(class="md:w-1/2 flex items-center justify-center")
        lottie-animation(ref='welcome' :loop="true" :autoplay="true" class="lottie-animation" :animationData="welcome")
    //this will align at the bottom center of the screen
    .absolute.bottom-0.left-0.right-0.flex.items-center.justify-center
        p.text-white.text-center.mb-4  Made with
            span.text-red-500.font-bold ❤️
            span.text-white.font-bold by 
                |   
                a(href="http://abdullahibnshahin.com" target="_blank" class="text-white font-bold") Abdullah Ibn Shahin
            br 
            span.text-white.font-bold Privacy Policy
            |  |
            |
            span.text-white.font-bold Terms of Service

    

    
  
</template>
  
  <script>
  import { ref } from 'vue'
  import welcome from '../assets/welcome.json'
  import { auth,db } from '../firebase'
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import {userData} from '../stores/userState'
  import {doc, getDoc,setDoc} from 'firebase/firestore'

  
  const provider = new GoogleAuthProvider();
  
  export default {
    setup() {


        const userDataStore = userData()

      const formAction = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            //check if the user exits in firestore database
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    //add user to firestore database
                    setDoc(userRef, {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        groups: [],
                        friends: [],
                        friendRequests: [],
                        watchList: [],
                    }).then(() => {
                        console.log("Document successfully written!");
                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });

                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            



            // IdP data available using getAdditionalUserInfo(result)
            userDataStore.setUser(user)
            
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            
            
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorMessage)
          });
      }

      
  
      return {
        formAction,
        welcome
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .login-page {
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}
  
  @keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
  
  .animated-bg {
    animation: gradient-animation 10s ease infinite;
  }
  
 
  </style>
  