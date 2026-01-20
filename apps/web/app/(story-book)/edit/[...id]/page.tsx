"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseStories } from "../../../../Actions/useStories";
import { useRecoilValue } from "recoil";
import { StoryAtom } from "../../../../store/atoms/storyAtom";
import { ArrowLeft, Save, RotateCcw, PenTool } from "lucide-react";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await UpdateStory(id as string, title, description, content);
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen  font-serif overflow-x-hidden flex items-center justify-center py-26 px-4">
      
      {/* 1. PAPER TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />

      <div className="relative z-10 w-full max-w-3xl border-2 border-[#2d2a26] p-1 bg-[#f4e4c1]/50 shadow-[10px_10px_0px_0px_rgba(45,42,38,1)]">
        <div className="border border-[#2d2a26] p-6 sm:p-10">
          
          {/* VINTAGE HEADER */}
          <div className="mb-10 text-center border-b-2 border-double border-[#2d2a26] pb-6">
            <div className="flex justify-center mb-2 opacity-40">
                <PenTool size={32} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter">
              Edit Archive
            </h1>
            <p className="mt-2 text-[10px] uppercase tracking-[0.4em] opacity-60">
              Revision Desk • ID: {id?.toString().slice(0,8)} • Classified
            </p>
          </div>

          {/* FORM AREA */}
          <div className="space-y-8">
            
            {/* Title Input */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70 italic underline">Headline Revision</label>
              <input
                type="text"
                placeholder="REVISE TITLE..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent py-2 text-2xl font-bold uppercase border-b-2 border-[#2d2a26] placeholder:opacity-30 focus:outline-none focus:border-red-800 transition-colors"
              />
            </div>

            {/* Description Input */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70 italic underline">Abstract Modification</label>
              <textarea
                placeholder="Modify summary..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-transparent py-2 italic text-lg border-b border-[#2d2a26]/40 placeholder:opacity-30 focus:outline-none resize-none"
              />
            </div>

            {/* Content Textarea */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70 italic underline">Narrative Correction</label>
              <textarea
                placeholder="Rewrite the history..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-transparent border-2 border-dashed border-[#2d2a26]/30 p-4 text-lg leading-relaxed placeholder:opacity-20 focus:outline-none focus:border-[#2d2a26] transition-colors bg-[#000]/5"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-double border-[#2d2a26] mt-10">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity hover:underline"
              >
                <RotateCcw size={14} />
                Abort Changes
              </button>

              <button
                onClick={handleEdit}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#2d2a26] text-[#e8d5b5] px-10 py-4 font-black uppercase italic tracking-widest shadow-[6px_6px_0px_0px_rgba(180,160,120,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? "Rewriting..." : (
                  <>
                    <Save size={18} />
                    Update Record
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Subtle Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-[20vw] font-black uppercase italic -rotate-12">
        Revised
      </div>
    </div>
  );
}