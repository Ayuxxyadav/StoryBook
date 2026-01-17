"use client";

import { useRecoilValueLoadable } from "recoil";
import { StoryAtom } from "../../../store/atoms/storyAtom";
import MyStoryBookSkeleton from "../../../component/utils/Skeleton/Story";
import { UseStories } from "../../../Actions/useStories";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { DeleteStory } = UseStories();
  const storiesLoadable = useRecoilValueLoadable(StoryAtom);

  if (storiesLoadable.state === "loading") {
    return (
      <div className="p-6 sm:p-10">
        <MyStoryBookSkeleton />
      </div>
    );
  }

  if (storiesLoadable.state === "hasError") {
    return (
      <div className="p-10 text-red-500">
        Something went wrong
      </div>
    );
  }

  const stories = storiesLoadable.contents;

  return (
    <div className="min-h-screen px-4 py-26 sm:px-8 lg:px-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold">
          My Stories
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Manage your content easily
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl bg-blue-700 p-6
                       shadow-md transition hover:shadow-xl"
          >
            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-1">
              {story.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-100 line-clamp-3 mb-6">
              {story.description}
            </p>

            {/* Actions */}
            <div className="mt-auto flex items-center justify-between">
              <button
                onClick={() => router.push(`/edit/${story.StoryId}`)}
                className="rounded-lg bg-white/90 px-4 py-2 text-sm font-medium
                           text-black hover:bg-gray-300 transition"
              >
                Edit
              </button>

              <button
                onClick={() => DeleteStory(story.StoryId)}
                className="rounded-lg px-4 py-2 text-sm font-medium bg-red-500
                           text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="mt-24 text-center text-zinc-500 dark:text-zinc-400">
          No stories yet ✍️
        </div>
      )}
    </div>
  );
}
