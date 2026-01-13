
import { atom } from "recoil";

export const isLoggedInAtom = atom<boolean>({
  key: "isLoggedInAtom", 
  default: false     
});

export const authLoadingAtom = atom<boolean>({
  key : "authLoadingAtom",
  default : true
})

