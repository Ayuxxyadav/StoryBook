"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseStories } from "../../../../Actions/useStories";
import { useRecoilValue } from "recoil";
import { StoryAtom } from "../../../../store/atoms/storyAtom";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const { UpdateStory } = UseStories();
  const stories = useRecoilValue(StoryAtom);

  useEffect(() => {
    const existingStory = stories.find((s) => s.StoryId === id);
    if (existingStory) {
      setTitle(existingStory.title);
      setDescription(existingStory.description);
      setContent(existingStory.content);
    }
  }, [id, stories]);

  const handleEdit = async () => {
    await UpdateStory(id as string, title, description, content);
    router.push("/dashboard"); // optional redirect
  };

  return (
    <div className="min-h-screen px-4 py-16 sm:px-8 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-blue-700 p-6 sm:p-8 shadow-xl">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Edit Story
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100">
            Update your story details
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Story title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-white px-4 py-3
                       text-sm sm:text-base text-black
                       outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-white px-4 py-3
                       text-sm sm:text-base text-black
                       outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Content */}
          <textarea
            placeholder="Edit your story content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-lg bg-white px-4 py-3
                       text-sm sm:text-base text-black
                       outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => router.back()}
              className="rounded-lg bg-white/20 px-4 py-2 text-sm
                         font-medium text-white hover:bg-white/30 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleEdit}
              className="rounded-lg bg-white px-6 py-2 text-sm
                         font-semibold text-blue-700
                         hover:bg-gray-200 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
