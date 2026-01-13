
import { atom, selector } from "recoil";


interface User {
    userName: string,
    email : string
}

export const userAtom = atom<User|null>({
    key:"userAtom",
    default:null
})


