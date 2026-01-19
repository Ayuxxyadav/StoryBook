"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecoilValueLoadable } from "recoil";
import { SingleStorySelector } from "../../../../store/atoms/storyAtom";
import { ArrowLeft } from "lucide-react";
import MyStoryBookSkeleton from "../../../../component/utils/Skeleton/Story";

export default function StoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const storyLoadable = useRecoilValueLoadable(SingleStorySelector(id as string));

  if (storyLoadable.state === "loading") {
    return <div className="min-h-screen bg-[#d9c5a0] flex items-center justify-center"><MyStoryBookSkeleton /></div>;
  }

  const story = storyLoadable.contents;
  if (!story) return <div className="p-20 text-center font-serif">Story not found.</div>;

  return (
    <div className="relative min-h-screen w-full bg-[#e8d5b5] text-[#2d2a26] font-serif overflow-x-hidden">
      
      {/* 1. VINTAGE OVERLAY (Old Paper Texture) */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      
      {/* 2. BACKGROUND IMAGE (Like the Flower in your reference) */}
      {story.imageUrl && (
        <div 
          className="fixed inset-0 z-0 opacity-40 mix-blend-multiply bg-no-repeat bg-center bg-contain md:bg-right md:mr-20"
          style={{ 
            backgroundImage: `url(${story.imageUrl})`,
            filter: 'sepia(0.5) contrast(1.2)'
          }}
        />
      )}

      {/* 3. NAVIGATION */}
      <nav className="relative z-30 p-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-all font-serif italic border-b border-black/20"
        >
          <ArrowLeft size={18} />
          <span>Back to Archive</span>
        </button>
      </nav>

      {/* 4. MAIN CONTENT (Newspaper/Book Style) */}
      <main className="relative z-20 max-w-4xl mx-auto px-8 pt-10 pb-32">
        
        {/* Newspaper Header */}
        <header className="border-b-2 border-black/80 pb-6 mb-12 text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-70">
            Chronicle Issue No. {story.StoryId.slice(0, 4)} // Vol. 1884
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
            {story.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 border-t border-black/20 pt-4">
            <span className="text-xs italic">{story}</span>
            <span className="text-xs uppercase tracking-widest font-bold">Jan 19, 2026</span>
          </div>
        </header>

        {/* Abstract/Description Section */}
        <div className="mb-12 bg-black/5 p-6 border-l-4 border-black italic text-xl leading-relaxed">
          {story.description}
        </div>

        {/* Main Story Text (Justified Newspaper Style) */}
        <article className="relative">
          <div className="text-lg sm:text-2xl leading-[1.6] text-justify space-y-8 whitespace-pre-line font-serif">
            {/* Drop Cap (Pehla letter bada) */}
            <span className="float-left text-8xl font-black mr-4 mt-2 leading-[0.7] text-black">
              {story.content.charAt(0)}
            </span>
            {story.content.slice(1)}
          </div>
        </article>

        {/* Decorative Divider */}
        <div className="mt-20 flex justify-center opacity-30">
          <div className="h-[1px] w-40 bg-black" />
          <div className="mx-4 -mt-1 font-serif text-xl">❦</div>
          <div className="h-[1px] w-40 bg-black" />
        </div>
      </main>

      {/* CSS for custom fonts and justifying text */}
      <style jsx>{`
        main {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }
        article {
          column-gap: 2rem;
          hyphens: auto;
        }
      `}</style>
    </div>
  );
}