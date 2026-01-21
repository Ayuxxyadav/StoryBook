"use client";

import { useEffect, useState } from "react";
import { UseStories } from "../../../Actions/useStories";
import { useRouter } from "next/navigation";
import { ArrowLeft, Type, FileText, ImageIcon, Send } from "lucide-react";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../../../store/atoms/authAtom";
import toast from "react-hot-toast";


export default function Create() {
  const router = useRouter();
  const { CreateStory } = UseStories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const IsLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    if (!IsLoggedIn) {
      toast.error("Please login first", { id: "login-required" });
      router.replace("/auth/signin");
    }
  }, [IsLoggedIn, router]);

  if (!IsLoggedIn) {
    return null;
  }

  const handleCreate = async () => {
    setLoading(true);
    await CreateStory(title, description, content, image || undefined);
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen   font-serif overflow-x-hidden flex items-center justify-center py-26 px-4">

      {/* 1. PAPER TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />

      <div className="relative z-10 w-full max-w-3xl border-2 border-[#2d2a26] p-1 bg-[#f4e4c1]/50 shadow-[10px_10px_0px_0px_rgba(45,42,38,1)]">
        <div className="border border-[#2d2a26] p-6 sm:p-10">

          {/* VINTAGE HEADER */}
          <div className="mb-10 text-center border-b-2 border-double border-[#2d2a26] pb-6">
            <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter">
              New Dispatch
            </h1>
            <p className="mt-2 text-[10px] uppercase tracking-[0.4em] opacity-60">
              Drafting Station • Office of Story BooK
            </p>
          </div>

          {/* FORM AREA */}
          <div className="space-y-8">

            {/* Title Input */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70">Headline</label>
              <div className="flex items-center border-b-2 border-[#2d2a26]">
                <Type size={18} className="mr-3 opacity-50" />
                <input
                  type="text"
                  placeholder="ENTER STORY TITLE..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent py-2 text-xl font-bold uppercase placeholder:opacity-30 focus:outline-none"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70">Summary / Abstract</label>
              <div className="flex items-start border-b border-[#2d2a26]/40">
                <FileText size={18} className="mr-3 mt-3 opacity-50" />
                <textarea
                  placeholder="A brief overview of the events..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-transparent py-2 italic text-lg placeholder:opacity-30 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Content Textarea */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70">The Main Narrative</label>
              <textarea
                placeholder="Type your story here, warrior..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-transparent border-2 border-dashed border-[#2d2a26]/30 p-4 text-lg leading-relaxed placeholder:opacity-20 focus:outline-none focus:border-[#2d2a26] transition-colors"
              />
            </div>

            {/* Image Upload Area */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block opacity-70">Visual Evidence (Image)</label>
              <div className="flex items-center justify-center w-full border-2 border-dotted border-[#2d2a26]/50 p-6 hover:bg-black/5 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs italic opacity-60">
                    {image ? image.name : "Click to attach a photographic record"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-double border-[#2d2a26] mt-10">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={14} />
                Discard Draft
              </button>

              <button
                onClick={handleCreate}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#2d2a26] text-[#e8d5b5] px-10 py-4 font-black uppercase italic tracking-widest shadow-[6px_6px_0px_0px_rgba(180,160,120,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? "Publishing..." : (
                  <>
                    <Send size={18} />
                    Submit Dispatch
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none">
        <Type size={200} strokeWidth={0.5} />
      </div>
    </div>
  );
}