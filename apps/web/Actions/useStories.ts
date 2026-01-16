import { useSetRecoilState } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { storyAtom,Story } from "../store/atoms/storyAtom";

export const useStories = () => {
  const setStories = useSetRecoilState(storyAtom);

  // --- CREATE ---
  const createStory = async (title: string, description: string, content: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/create`, 
        { title, description, content }, 
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      
      // Backend 'StoryBookId' bhej raha hai, humein pura object banake atom mein daalna hoga
      const newStory: Story = {
        id: res.data.StoryBookId,
        Title: title,
        Description: description,
        Content: content
      };

      setStories((prev) => [newStory, ...prev]);
      return { success: true };
    } catch (e) { return { success: false }; }
  };




  
  // --- EDIT ---
  const editStory = async (id: string, title: string, description: string, content: string) => {
    try {
      await axios.put(`${BACKEND_URL}/edit/${id}`, 
        { title, description, content },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setStories((prev) => prev.map(s => s.id === id ? { ...s, Title: title, Description: description, Content: content } : s));
      return { success: true };
    } catch (e) { return { success: false }; }
  };






  // --- DELETE ---
  const deleteStory = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      setStories((prev) => prev.filter(s => s.id !== id));
      return { success: true };
    } catch (e) { return { success: false }; }
  };

  return { createStory, editStory, deleteStory };
};