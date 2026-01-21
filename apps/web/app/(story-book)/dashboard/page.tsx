"use client";

import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { StoryAtom } from "../../../store/atoms/storyAtom";
import MyStoryBookSkeleton from "../../../component/utils/Skeleton/Story";
import { UseStories } from "../../../Actions/useStories";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit3, Share, Globe, Lock } from "lucide-react";
import { isLoggedInAtom } from "../../../store/atoms/authAtom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const { DeleteStory, FeatureStory } = UseStories();
  const storiesLoadable = useRecoilValueLoadable(StoryAtom);
  const IsLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    if (!IsLoggedIn) {
      toast.error("Please login first to access Dashboard", { id: "login-required" });
      router.replace("/auth/signin");
    }
  }, [IsLoggedIn, router]);

  if (storiesLoadable.state === "loading") {
    return <div className="min-h-screen  p-10"><MyStoryBookSkeleton /></div>;
  }

  if (storiesLoadable.state === "hasError") {
    return <div className="p-10 text-red-800 font-serif">Error: Failed to load archives.</div>;
  }

  const stories = storiesLoadable.contents;

  return (
    <div className="relative min-h-screen  font-serif overflow-x-hidden pb-20">

      {/* 1. PAPER TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">

        {/* VINTAGE HEADER */}
        <div className="border-b-4 border-double border-[#2d2a26] pb-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-5xl font-black uppercase tracking-tighter">
              My <span className="text-[#d9c5a0]">Archives</span>
            </h1>
            <p className="mt-2  text-sm uppercase tracking-[0.3em] opacity-70">
              Volume I • {new Date().toDateString()}
            </p>
          </div>

          <button
            onClick={() => router.push("/create")}
            className="group flex items-center gap-2 border-2 border-[#2d2a26] px-6 py-3 font-bold uppercase hover:bg-[#2d2a26] hover:text-[#e8d5b5] transition-all -rotate-1 shadow-[4px_4px_0px_0px_rgba(45,42,38,1)] active:shadow-none active:translate-x-1"
          >
            <Plus size={20} />
            Write New Entry
          </button>
        </div>

        {/* STORIES GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (

            <div

              key={index}
              onClick={() => router.push(`/story/${story.StoryId}`)}
              className="group cursor-pointer  transition-colorsrelative flex flex-col border border-[#2d2a26]/30 bg-[#f4e4c1]/50 p-4 shadow-sm hover:shadow-xl transition-all"
            >
              {/* Card Image as a 'Photo Print' */}
              <div className="relative w-full h-56 mb-4 overflow-hidden border-2 border-[#2d2a26]">
                {story.imageUrl ? (
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover sepia-[0.4] grayscale-[0.2] group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#d9c5a0] text-xs uppercase italic opacity-40">
                    No Visual Record
                  </div>
                )}
                {/* Status Tag */}
                <div className="absolute top-2 right-2 bg-[#2d2a26] text-[#e8d5b5] px-2 py-1 text-[10px] uppercase font-bold tracking-widest -rotate-2">
                  {story.isPublic ? "Public" : "Classified"}
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col flex-grow">
                <h2 className="text-2xl font-black uppercase leading-none mb-3  group-hover:text-red-900 transition-colors">
                  {story.title}
                </h2>

                <p className="text-sm leading-relaxed text-justify line-clamp-4 opacity-80 mb-6 font-medium border-t border-[#2d2a26]/10 pt-3">
                  {story.description}
                </p>

                {/* Vintage Action Buttons */}
                <div className="mt-auto flex items-center justify-between border-t-2 border-dotted border-[#2d2a26]/20 pt-4">
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/edit/${story.StoryId}`); }}
                      className="hover:scale-110 transition-transform text-[#2d2a26]"
                      title="Edit Entry"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        toast(
                          (t) => (
                            <div className="flex flex-col gap-3">
                              <p className="text-sm font-medium text-zinc-800">
                                Are you sure you want to burn this record?
                              </p>

                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => toast.dismiss(t.id)}
                                  className="rounded-md px-3 py-1 text-sm bg-zinc-200 hover:bg-zinc-300"
                                >
                                  Cancel
                                </button>

                                <button
                                  onClick={() => {
                                    toast.dismiss(t.id);
                                    DeleteStory(story.StoryId);
                                  }}
                                  className="rounded-md px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ),
                          { duration: 6000 }
                        );
                      }}
                      className="hover:scale-110 transition-transform text-red-800"
                      title="Burn Record"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); FeatureStory(story.StoryId); }}
                    className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-[#2d2a26] transition-colors ${story.isPublic ? "bg-[#2d2a26] text-[#e8d5b5]" : "hover:bg-[#2d2a26] hover:text-[#e8d5b5]"
                      }`}
                  >
                    {story.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                    {story.isPublic ? "Live" : "Archive"}
                  </button>
                </div>
              </div>

              {/* Decorative Corner Fold */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#d9c5a0] to-transparent opacity-50" />
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {stories.length === 0 && (
          <div className="mt-32 text-center">
            <p className="text-2xl italic opacity-40">The archives are currently empty...</p>
          </div>
        )}
      </div>

      {/* FOOTER DECORATION */}
      <div className="mt-20 border-t border-[#2d2a26]/20 py-10 text-center opacity-40 text-[10px] tracking-[0.5em] uppercase">
        © The Story Book //
      </div>
    </div>
  );
}