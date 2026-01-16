"use client";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { storyAtom } from "../../../store/atoms/storyAtom";
import { useStories } from "../../../Actions/useStories";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export default function Dashboard() {
  const stories = useRecoilValue(storyAtom);
  const setStories = useSetRecoilState(storyAtom);
  const { deleteStory } = useStories();
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BACKEND_URL}/my-story-book`, {
          headers: { Authorization: token },
        });

        setStories(res.data.story || []);
      } catch (e) {
        console.error("Fetch failed", e);
      }
    };

    fetchStories();
  }, [setStories]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-26">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              My Storybooks
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage and edit your creative stories
            </p>
          </div>

          <button
            onClick={() => router.push("/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium shadow-lg"
          >
            + Create New Story
          </button>
        </div>

        {/* Stories */}
        {stories.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500">
              No stories yet. Start writing your first masterpiece!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow border"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {story.Title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {story.Description}
                  </p>

                  <div className="flex justify-between pt-4 border-t">
                    <button
                      onClick={() => router.push(`/edit/${story.id}`)}
                      className="text-indigo-600 font-semibold text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Delete this story?")) {
                          deleteStory(story.id);
                        }
                      }}
                      className="text-red-500 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
