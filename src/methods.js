import { auth } from "./firebase";

const logout = async () => {
    await auth.signOut();
}


export  { logout }