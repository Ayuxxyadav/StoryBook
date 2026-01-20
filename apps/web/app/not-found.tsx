"use client"

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-zinc-400">
        Page not found
      </p>

      <button
        onClick={()=>{router.push("/")}}
        className="mt-6 rounded-lg bg-white px-6 py-2 text-black font-medium"
      >
        Go Home
      </button>
    </div>
  );
}
