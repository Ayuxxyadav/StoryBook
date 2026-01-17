import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";

export interface Story {
  StoryId: string;
  title: string;
  description: string;
  content: string;
  isPublic:boolean
}

export const StorySelector = selector<Story[]>({
  key: "StorySelector",
  get: async () => {
    // SSR safety check
    if (typeof window === 'undefined') return [];

    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await axios.get(`${BACKEND_URL}/my-story-book`, {
        headers: {
          Authorization: token
        }
      });

      // Aapka backend response 'story' key ke andar array bhej raha hai
      const data = res.data.story;

      if (!Array.isArray(data)) {
        return [];
      }

      // Mapping logic fix: s.id use karein, s.data.id nahi
      return data.map((s: any) => ({
        StoryId: s.id,               // Backend: "id"
        title: s.Title,             // Backend: "Title" (Capital T)
        description: s.Description, // Backend: "Description" (Capital D)
        content: s.Content  ,
        isPublic: s.isPublic        // Backend: "Content" (Capital C)
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