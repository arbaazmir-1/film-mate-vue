import { auth } from "./firebase";
import { userData } from "./stores/userState";

const logout = async () => {
    const userDataStore = userData()
    auth.signOut().then(() => {
        userDataStore.setUser(userDataStore, {})
        console.log('logged out')
    }
    ).catch((error) => {
        console.log(error)
    }
    )
}


export  { logout }