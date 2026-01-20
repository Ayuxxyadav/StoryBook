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


export const SingleStorySelector = selectorFamily< Story | null, string >({
  key: "SingleStorySelector",
  get: (id: string) => async ({ get }) => {
    
    const allStories = get(StoryAtom);

    const cachedStory = allStories.find(
      (s) => s.StoryId === id
    );

    if (cachedStory) {
      return cachedStory;
    }

    if (typeof window === "undefined") {
      return null;
    }

    const token = localStorage.getItem("token");
    if (!token) return null;

    // 4️⃣ API call
    try {
      const res = await axios.get(
        `${BACKEND_URL}/story/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

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
      console.error("Single story fetch failed:", error);
      return null;
    }
  },
});



// For Public Route


export const PublicStorySelector = selector<Story[]>({
  key: "PublicStorySelector",
  get: async () => {
    try {
      

      const res = await axios.get(`${BACKEND_URL}/Story-Book`, {
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

export const PublicSingleStorySelector = selectorFamily< Story | null, string >({
  key: "PublicSingleStorySelector",
  get: (id: string) => async ({ get }) => {
    
    const allStories = get(PublicStoryAtom);

    const cachedStory = allStories.find(
      (s) => s.StoryId === id
    );

    if (cachedStory) {
      return cachedStory;
    }

    if (typeof window === "undefined") {
      return null;
    }

    const token = localStorage.getItem("token");
    if (!token) return null;

    // 4️⃣ API call
    try {
      const res = await axios.get(
        `${BACKEND_URL}/Story-Book/${id}`,
      );

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
      console.error("Single story fetch failed:", error);
      return null;
    }
  },
});



export const PublicStoryAtom = atom<Story[]>({
  key:"PublicStoryAtom",
  default:PublicStorySelector
})
