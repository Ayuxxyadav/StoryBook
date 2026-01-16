"use client";
import { useState } from "react";
import { useStories } from "../../../Actions/useStories"; 
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const { createStory } = useStories();
  const router = useRouter();

  const handleCreate = async () => {
    if(!title || !content) return alert("Title and Content are required");
    const res = await createStory(title, desc, content);
    if(res.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl p-10 mt-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">Create New Story</h2>
        
        <div className="space-y-6">
          <input 
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-gray-700" 
            placeholder="Story Title" 
            onChange={e => setTitle(e.target.value)} 
          />
          <input 
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-gray-700" 
            placeholder="Short Description" 
            onChange={e => setDesc(e.target.value)} 
          />
          <textarea 
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-gray-700 h-56 resize-none" 
            placeholder="Start writing your story content..." 
            onChange={e => setContent(e.target.value)} 
          />
          <button 
            onClick={handleCreate} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95"
          >
            Publish Story
          </button>
        </div>
      </div>
    </div>
  );
}