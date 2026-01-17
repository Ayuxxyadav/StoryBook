import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: "dark", // Shuruat light mode se hogi
});