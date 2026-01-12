"use client";

import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signin() {
  const router = useRouter();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  async function handleSignIn() {
    if (!username || !password) return alert("Please fill in all fields");

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password,
      });

      // Backend response structure ke hisaab se token nikalein
      const token = res.data.token || res.data;
      
      localStorage.setItem("token", token);
      router.push("/");
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-zinc-400">Please enter your details to sign in</p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Username</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-zinc-400">Password</label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleSignIn}
            className="w-full mt-2 rounded-lg bg-white p-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-white/5"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-400 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}