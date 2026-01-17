"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Gradient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[160px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">

        {/* Hero */}
        <p className="mb-3 text-sm text-zinc-400">
          Welcome to
        </p>

        <h1 className="text-center text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Story
          </span>{" "}
          Book<span className="text-white">.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-center text-sm sm:text-base text-zinc-400">
          A shared space where people write, share, and explore stories.
          Read experiences, ideas, and thoughts from writers around the world.
        </p>

        {/* Search */}
        <div className="mt-10 w-full max-w-xl">
          <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 backdrop-blur">
            <svg
              className="h-5 w-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>

            <input
              placeholder="Search stories, authors, topics..."
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />

            <kbd className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
              Ctrl + K
            </kbd>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/create")}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold
                       hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
          >
            Share Your Story
          </button>

          <button
            onClick={() => router.push("/stories")}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-sm
                       hover:bg-zinc-900 transition"
          >
            Explore Stories
          </button>
        </div>
      </div>

      {/* Bottom Tags */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
          Fiction
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
          Life
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
          Tech
        </div>
      </div>
    </div>
  );
}
