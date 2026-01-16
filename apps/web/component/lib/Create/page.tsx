"use client";
import { useState } from "react";
import { useStories } from "../../../Actions/useStories"; 
import { useRecoilValue } from "recoil";
import { storyLoadingAtom } from "../../../store/atoms/storyAtom"; 

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  
  const { createStory } = useStories();
  const loading = useRecoilValue(storyLoadingAtom);

  const handleSubmit = async () => {
    if (!title || !content) return alert("Fields are required");
    
    const result = await createStory(title, desc, content);
    
    if (result.success) {
      alert("Story Created!");
      setTitle(""); setDesc(""); setContent(""); // Reset form
    }
  };

  return (
    <div className="p-30 flex flex-col gap-4">
      <input 
        className="border p-2 dark:bg-gray-800" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        className="border p-2 dark:bg-gray-800" 
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <textarea 
        className="border p-2 dark:bg-gray-800" 
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button 
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Story"}
      </button>
    </div>
  );
}