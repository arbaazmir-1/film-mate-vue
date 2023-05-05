import { auth } from "./firebase";
import { userData } from "./stores/userState";
import router from "./router";

const logout = async () => {
    const userDataStore = userData()
    auth.signOut().then(() => {
        userDataStore.setUser(userDataStore, {})
        console.log('logged out')
        router.push('/')
    }
    ).catch((error) => {
        console.log(error)
    }
    )
}


export  { logout }