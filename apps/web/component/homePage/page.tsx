"use client";

import { useRecoilValueLoadable } from "recoil";
import { PublicStoryAtom, StoryAtom } from "../../store/atoms/storyAtom"; 
import MyStoryBookSkeleton from "../utils/Skeleton/Story"; 
import { useRouter } from "next/navigation";
import { BookOpen, Scroll, Wind } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const storiesLoadable = useRecoilValueLoadable(PublicStoryAtom);

  if (storiesLoadable.state === "loading") {
    return <div className="min-h-screen p-10"><MyStoryBookSkeleton /></div>;
  }


  const publicStories = storiesLoadable.contents 

  return (
    <div className="relative min-h-screen font-serif overflow-x-hidden">
      
      {/* 1. VINTAGE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        
        {/* HERO SECTION - Newspaper Masthead Style */}
        <header className="text-center border-b-4 border-double border-[#2d2a26] pb-12 mb-16">
          <div className="flex justify-center mb-4 opacity-80">
            <Wind size={40} className="animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tight leading-none">
            Welcome to  <br /> <span className="text-7xl md:text-7xl py-3 text-[#d9c5a0] tracking-wider">STORY</span> <span className="text-7xl md:text-7xl tracking-wider">BOOK</span>
          </h1>

          <p className="mt-6 text-sm md:text-base uppercase tracking-[0.5em] font-bold opacity-70">
            • Volume 2026
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs italic opacity-50">
            <span>Verified Stories Only</span>
            <span>•</span>
            <span>Open to All Citizens</span>
          </div>
        </header>

        {/* PUBLIC STORIES GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {publicStories.length > 0 ? (
            publicStories.map((story: any, index: number) => (
              <div
                key={index}
                onClick={() => router.push(`/Story-Book/${story.StoryId}`)}
                className="group cursor-pointer relative flex flex-col bg-[#f4e4c1]/30 border border-[#2d2a26]/20 p-5 hover:bg-[#f4e4c1]/60 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                {/* Image Section - Vintage Polaroid Style */}
                <div className="relative w-full h-64 mb-6 overflow-hidden border border-[#2d2a26]/40 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
                  {story.imageUrl ? (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#d9c5a0]/50 italic text-sm opacity-40">
                      Visual Fragment Missing
                    </div>
                  )}
                  {/* Decorative Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#2d2a26]/80 text-[#e8d5b5] text-[10px] py-1 text-center uppercase tracking-widest font-bold">
                    Story File #{story.StoryId.slice(0, 5)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-3xl font-black uppercase leading-tight mb-4 group-hover:text-red-900 transition-colors">
                    {story.title}
                  </h2>

                  <p className="text-base leading-relaxed text-justify line-clamp-3 opacity-80 mb-8 border-l-2 border-[#2d2a26]/20 pl-4 italic">
                    {story.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                      Reading Time: 5 Mins
                    </span>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                      Read Journal <BookOpen size={14} />
                    </div>
                  </div>
                </div>

                {/* Aesthetic Corner Stamp */}
                <div className="absolute -top-2 -right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Scroll size={60} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl italic opacity-40 font-serif">
                No public dispatches have been released yet...
              </p>
            </div>
          )}
        </div>

        {/* FOOTER SECTION */}
        <footer className="mt-32 pt-12 border-t-2 border-[#2d2a26] flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
           <div className="text-[10px] tracking-widest uppercase font-bold">
             @StoryBook
           </div>
           <div className="flex gap-8">
             <button onClick={() => router.push('/auth/signin')} className="text-xs uppercase font-bold hover:underline">Officer Login</button>
             <button className="text-xs uppercase font-bold hover:underline"onClick={() => router.push('/dashboard')}>Archive Code</button>
           </div>
        </footer>
      </div>

      {/* Floating Call to Action */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-[#2d2a26] text-[#e8d5b5] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 border-4 border-[#e8d5b5]"
          title="Dashboard"
        >
          <Scroll size={24} />
        </button>
      </div>
    </div>
  );
}