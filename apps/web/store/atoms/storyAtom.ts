import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";
import { selectorFamily,atomFamily } from "recoil";

export interface Story {
  StoryId: string;
  title: string;
  description: string;
  content: string;
  isPublic: boolean;
  imageUrl: string | null; 
}

export const StorySelector = selector<Story[]>({
  key: "StorySelector",
  get: async () => {
    
    if (typeof window === 'undefined') return [];

    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await axios.get(`${BACKEND_URL}/my-story-book`, {
        headers: {
          Authorization: token
        }
      });

      // Backend response data nikal rahe hain
      const data = res.data.story;

      if (!Array.isArray(data)) {
        return [];
      }

      // Mapping logic: Backend se aane wale data ko Interface ke hisaab se set karein
      return data.map((s: any) => ({
        StoryId: s.id,               
        title: s.Title,             
        description: s.Description, 
        content: s.Content,
        isPublic: s.isPublic,
        imageUrl: s.imageUrl        
      }));

    } catch (error) {
      console.error("Fetch Error:", error);
      return [];
    }
  }
});

export const StoryAtom = atom<Story[]>({
  key: "StoryAtom",
  default: StorySelector
});



export const SingleStorySelector = selectorFamily<Story | null, string>({
  key: "SingleStorySelector",
  get: (storyId: string) => async ({ get }) => {
    // 1. Pehle StoryAtom se data uthane ki koshish karo
    const allStories = get(StoryAtom);
    const cachedStory = allStories.find((s) => s.StoryId === storyId);

    // 2. Agar data mil gaya, toh API call mat karo, yahi return kar do
    if (cachedStory) {
      return cachedStory;
    }

    // 3. Agar StoryAtom khali hai (jaise Page Refresh par hota hai), toh API call karo
    if (typeof window === "undefined" || !storyId) return null;

    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await axios.get(`${BACKEND_URL}/story/${storyId}`, {
        headers: { Authorization: token },
      });

      const s = res.data.story;
      if (!s) return null;

      return {
        StoryId: s.id,
        title: s.Title,
        description: s.Description,
        content: s.Content,
        isPublic: s.isPublic,
        imageUrl: s.imageUrl,
      };
    } catch (error) {
      console.error("Single Fetch Error:", error);
      return null;
    }
  },
});

export const SingleStoryAtom = atomFamily<Story | null, string>({
  key: "SingleStoryAtom",
  default: SingleStorySelector,
});