"use client";

import Link from "next/link";

export default function NavPage() {
  const mainLinks = [
    { item: "Home", route: "/" },
    { item: "StoryPlace", route: "/storyplace" },
    { item: "Dashboard", route: "/dashboard" },
  ];

  const authLinks = [
    { item: "Signin", route: "/auth/signin" },
    { item: "Signup", route: "/auth/signup" },
  ];

  return (
   
    <div className="fixed top-0 left-0 w-full z-50 px-4">
      <nav className="mt-4 max-w-6xl mx-auto bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
        <div className="px-8 h-16 flex items-center justify-between">
          
          
          <div className="flex-1">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-600">
              STORY<span className="text-gray-900">BOOK</span>
            </Link>
          </div>

          
          <div className="hidden md:flex flex-[2] justify-center items-center gap-10">
            {mainLinks.map((nav, index) => (
              <Link 
                key={index} 
                href={nav.route}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                {nav.item}
              </Link>
            ))}
          </div>

          
          <div className="flex-1 flex justify-end items-center gap-5">
            {authLinks.map((nav, index) => (
              <Link 
                key={index} 
                href={nav.route}
                className={`text-sm font-bold transition-all duration-300 ${
                  nav.item === "Signup" 
                  ? "bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 shadow-md active:scale-95" 
                  : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {nav.item}
              </Link>
            ))}
          </div>

        </div>
      </nav>
    </div>
  );
}