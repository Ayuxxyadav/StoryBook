"use client";

import { useRecoilValueLoadable } from "recoil";
import { StoryAtom } from "../../../store/atoms/storyAtom";
import MyStoryBookSkeleton from "../../../component/utils/Skeleton/Story";
import { UseStories } from "../../../Actions/useStories";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { DeleteStory, FeatureStory } = UseStories();
  const storiesLoadable = useRecoilValueLoadable(StoryAtom);

  if (storiesLoadable.state === "loading") {
    return (
      <div className="p-6 sm:p-10">
        <MyStoryBookSkeleton />
      </div>
    );
  }

  if (storiesLoadable.state === "hasError") {
    return <div className="p-10 text-red-500">Something went wrong</div>;
  }

  const stories = storiesLoadable.contents;

  return (
    <div className="min-h-screen px-4 py-26 sm:px-8 lg:px-16">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Stories</h1>
          <p className="mt-2 text-sm sm:text-base">Manage your content easily</p>
        </div>

        <button
          onClick={() => router.push("/create")}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Create Story
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <div
            key={index}
            // ✅ CARD CLICK: Detail page par bhej raha hai
            onClick={() => router.push(`/story/${story.StoryId}`)}
            className="group cursor-pointer flex flex-col rounded-2xl bg-blue-800 border border-blue-600 overflow-hidden shadow-md transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 bg-blue-900 overflow-hidden">
              {story.imageUrl ? (
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-blue-300 text-xs italic">
                  No Image Available
                </div>
              )}
              {/* Image ke upar tag */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white">
                {story.isPublic ? "Public" : " Private"}
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1 text-white group-hover:text-blue-300 transition-colors">
                {story.title}
              </h2>

              <p className="text-sm sm:text-base text-blue-100 line-clamp-3 mb-6 opacity-80">
                {story.description}
              </p>

              {/* Action Buttons Section */}
              <div className="mt-auto flex flex-wrap items-center gap-2 justify-between pt-4 border-t border-blue-700/50">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Detail page khulne se rokega
                    router.push(`/edit/${story.StoryId}`);
                  }}
                  className="rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-black hover:bg-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Detail page khulne se rokega
                    DeleteStory(story.StoryId);
                  }}
                  className="rounded-lg px-3 py-2 text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation(); //Detail page khulne se rokega
                    FeatureStory(story.StoryId);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    story.isPublic ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  {story.isPublic ? "Live" : "Share"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="mt-24 text-center text-zinc-500">
          No stories yet..
        </div>
      )}
    </div>
  );
}