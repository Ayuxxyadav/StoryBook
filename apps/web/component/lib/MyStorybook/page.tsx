"use client";

import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteBook from "../Delete/page";

interface Story {
  id: string;
  Title: string;
  Description: string;
}

export default function MystoryBook() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStories() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/my-story-book`, {
        headers: {
          Authorization: token,
        },
      });


      setStories(response.data.story);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading stories...</div>;
  }

  return (
    <div className="p-25 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Story Book</h1>

      {stories.length > 0 ? (
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border rounded-lg p-4 shadow"
            >
              <h2 className="text-lg font-semibold">{story.Title}</h2>
              <p className="text-gray-600">{story.Description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stories found. Start writing!</p>
      )}
    </div>
  );
}


