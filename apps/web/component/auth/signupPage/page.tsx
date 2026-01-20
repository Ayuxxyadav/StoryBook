'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../config";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../../../store/atoms/authAtom";

export default function Signup() { 
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");   
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLoggedIn = useRecoilValue(isLoggedInAtom)
useEffect(()=>{
  if(isLoggedIn){router.push("/")}
},[isLoggedIn,router])

  async function handleSignup() {
    if (!username || !email || !password) return alert("All fields are required");
    
    setLoading(true);
    try {
        await axios.post(`${BACKEND_URL}/signup`, {
            username,
            email,
            password
        });
        alert("Account created successfully!");
       
        router.push("/auth/signin"); 
    } catch (error) {
        console.error(error);
        alert("Signup failed. Please try again.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 ">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-[#d9c5a0] p-8 backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black">Create an account</h2>
          <p className="mt-2  text-black text-sm ">Enter your details to get started</p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black  mb-1.5">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={username} 
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-lg  border border-zinc-700 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm   text-black  font-medium mb-1.5">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm  text-black  font-medium  mb-1.5">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg  border border-zinc-700 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <button 
            disabled={loading}
            onClick={handleSignup}
            className="w-full rounded-lg bg-white p-3 text-sm font-bold text-black transition-all hover:bg-yellow-100 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-black hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}