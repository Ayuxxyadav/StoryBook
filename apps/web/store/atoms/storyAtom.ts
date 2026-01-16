import { atom } from "recoil";

export interface Story {
  id: string;
  Title: string;
  Description: string;
  Content: string;
  authorId?: string; // Optional: Agar aapko check karna ho ki owner kaun hai
}

// 2. Main Atom: Jo saari stories ki list (Array) ko store karega.
export const storyAtom = atom<Story[]>({
  key: "storyAtom", 
  default: [],      
});


export const storyLoadingAtom = atom<boolean>({
  key: "storyLoadingAtom",
  default: false,
});

export const currentStoryAtom = atom<Story | null>({
  key: "currentStoryAtom",
  default: null,
});