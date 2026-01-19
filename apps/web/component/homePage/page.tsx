"use client";

import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { StoryAtom } from "../../store/atoms/storyAtom";

export default function HomePage() {
  const router = useRouter();
  const stories = useRecoilValue(StoryAtom);

  return (
    <div
      className="
        min-h-screen px-4 py-14 sm:px-8 lg:px-16
        bg-gray-100 dark:bg-gray-950
        transition-colors duration-300
      "
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1
          className="
            text-3xl sm:text-4xl font-bold
            text-gray-900 dark:text-white
          "
        >
          📖 Story Book
        </h1>

        <p
          className="
            mt-2 text-sm sm:text-base
            text-gray-600 dark:text-gray-400
          "
        >
          Read & share amazing stories from creators
        </p>
      </div>

      {/* Stories Grid */}
      {stories.length === 0 ? (
        <div
          className="
            text-center mt-20
            text-gray-500 dark:text-gray-400
          "
        >
          No stories found 😔
        </div>
      ) : (
        <div
          className="
            grid gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {stories.map((story) => (
            <div
              key={story.StoryId}
              onClick={() => router.push(`/story/${story.StoryId}`)}
              className="
                cursor-pointer rounded-2xl p-6
                bg-white dark:bg-gray-900
                shadow-md dark:shadow-none
                border border-gray-200 dark:border-gray-800
                hover:scale-[1.02]
                transition-all duration-300
              "
            >
              {/* Title */}
              <h2
                className="
                  text-xl font-semibold
                  text-gray-900 dark:text-white
                  line-clamp-1
                "
              >
                {story.title}
              </h2>

              {/* Description */}
              <p
                className="
                  mt-2 text-sm
                  text-gray-600 dark:text-gray-400
                  line-clamp-2
                "
              >
                {story.description}
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="
                    text-xs
                    text-gray-500 dark:text-gray-400
                  "
                >
                  Read more →
                </span>

                <span
                  className="
                    text-xs font-medium
                    text-blue-600 dark:text-blue-400
                  "
                >
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
