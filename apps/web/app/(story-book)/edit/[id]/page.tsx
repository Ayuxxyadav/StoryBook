"use client";
import { useParams, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { storyAtom } from "../../../../store/atoms/storyAtom";
import { useEffect, useState } from "react";
import { useStories } from "../../../../Actions/useStories";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [stories, setStories] = useRecoilState(storyAtom);
  const { editStory } = useStories();





  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);




  useEffect(() => {
    const fetchCurrentStory = async () => {

      let story = stories.find((s) => s.id === id);
    
      if (!story) {
        try {
          const res = await axios.get(`${BACKEND_URL}/story/${id}`, {
            headers: { Authorization: localStorage.getItem("token") }
          });
          story = res.data.story || res.data; 
        } catch (err) {
          console.error("Story fetch failed", err);
        }
      }

      if (story) {
        setTitle(story.Title);
        setDescription(story.Description);
        setContent(story.Content); 
      }
      setIsPageLoading(false);
    };

    fetchCurrentStory();
  }, [id, stories]);

  const handleUpdate = async () => {
    if (!title || !description || !content) {
      alert("Please fill all fields");
      return;
    }

    setIsUpdating(true);
    const res = await editStory(id as string, title, description, content);
    setIsUpdating(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      alert("Failed to update story.");
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b dark:border-gray-700 pb-4">
            Edit Your Masterpiece
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Story Title</label>
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Short Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white h-24" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Main Content</label>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white h-72" 
                placeholder="Story content should appear here..."
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => router.push("/dashboard")} 
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-4 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate} 
                disabled={isUpdating}
                className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold shadow-lg disabled:bg-indigo-400 transition transform active:scale-95"
              >
                {isUpdating ? "Saving..." : "Update Story"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}