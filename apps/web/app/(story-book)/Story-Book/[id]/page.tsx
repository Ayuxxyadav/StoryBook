"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { PublicSingleStorySelector, SingleStorySelector } from "../../../../store/atoms/storyAtom";

import MyStoryBookSkeleton from "../../../../component/utils/Skeleton/Story";
import { userAtom } from "../../../../store/atoms/userAtom";

export default function PublicStoryDetailPage() {
  const { id } = useParams();
  const username = useRecoilValue(userAtom)
  const router = useRouter();
  const storyLoadable = useRecoilValueLoadable(PublicSingleStorySelector(id as string));

  if (storyLoadable.state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MyStoryBookSkeleton />
      </div>
    );
  }

  const story = storyLoadable.contents;
  
  if (!story) return <div className="p-20 text-center font-serif">Story not found.</div>;

  return (
    <div className="relative py-20 min-h-screen w-full  font-serif overflow-x-hidden">
      
      {/* 1. VINTAGE OVERLAY (Old Paper Texture) */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      
      {/* 2. BACKGROUND IMAGE */}
      {story.imageUrl && (
        <div 
          className="fixed inset-0 z-0 opacity-[0.15] mix-blend-multiply bg-no-repeat bg-center bg-cover pointer-events-none"
          style={{ 
            backgroundImage: `url(${story.imageUrl})`,
            // Vintage texture ke saath match karne ke liye filters
            filter: 'sepia(0.8) contrast(1.2) brightness(1.0)'
          }}
        />
      )}


      {/* 4. MAIN CONTENT */}
      <main className="relative z-20 max-w-4xl mx-auto px-8 pt-10 pb-32">
        
        {/* Newspaper Header */}
        <header className="border-b-2 pb-6 mb-12 text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-70">
            Chronicle Issue No. {story.StoryId ? story.StoryId.slice(0, 4) : "0000"} // Vol. 1884
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
            {story.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 border-t pt-4">
            
            <span className="text-xs italic">Author: {username?.userName} </span>
            <span className="text-xs uppercase tracking-widest font-bold">Jan 19, 2026</span>
          </div>
        </header>

        {/* Abstract/Description Section */}
        <div className="mb-12 bg-black/5 p-6 border-l-4 italic text-xl leading-relaxed">
          {story.description}
        </div>

        {/* Main Story Text */}
        <article className="relative">
          <div className="text-lg sm:text-2xl leading-[1.6] text-justify space-y-8 whitespace-pre-line font-serif">
            {/* Drop Cap */}
            <span className="float-left text-8xl font-black mr-4 mt-2 leading-[0.7]">
              {story.content ? story.content.charAt(0) : ""}
            </span>
            {story.content ? story.content.slice(1) : ""}
          </div>
        </article>

        {/* Decorative Divider */}
        <div className="mt-20 flex justify-center opacity-30">
          <div className="h-[1px] w-40 bg-black" />
          <div className="mx-4 -mt-1 font-serif text-xl">❦</div>
          <div className="h-[1px] w-40 bg-black" />
        </div>
      </main>

      <style jsx>{`
        main {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}