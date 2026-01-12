import { atom } from "recoil";

export const isLoggedInAtom = atom({
  key: "isLoggedInAtom", // Unique ID
  default: false,        // Initial value
});