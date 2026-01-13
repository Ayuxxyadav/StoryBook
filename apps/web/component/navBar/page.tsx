"use client";

import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import { authLoadingAtom, isLoggedInAtom } from "../../store/atoms/authAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { themeAtom } from "../../store/atoms/themeAtom";
import { userAtom } from "../../store/atoms/userAtom";
import NavbarSkeleton from "./navBarSkeleton/page";
import { ProfilePage } from "../utils/profile";

export default function NavPage() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [authLoading, setAuthLoading] = useRecoilState(authLoadingAtom);
  const setUser = useSetRecoilState(userAtom);

useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  setIsLoggedIn(!!token);

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  setAuthLoading(false);
}, []);

  if (authLoading) {
    return <NavbarSkeleton />;
  }

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
      <nav className="mt-4 max-w-6xl mx-auto bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-lg rounded-2xl">
        <div className="px-6 h-16 flex items-center justify-between">

  
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-blue-600"
          >
            STORY<span className="text-gray-900 dark:text-white">BOOK</span>
          </Link>

    
          <div className="hidden md:flex gap-10">
            {mainLinks.map((nav) => (
              <Link
                key={nav.item}
                href={nav.route}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
              >
                {nav.item}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center gap-5">

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="relative flex items-center w-14 h-8 rounded-full 
                         bg-gray-200 dark:bg-gray-700 transition-colors"
            >
              <span
                className={`absolute left-1 top-1 w-6 h-6 rounded-full 
                            bg-white dark:bg-black shadow-md 
                            transform transition-transform duration-300
                            ${theme === "dark" ? "translate-x-6" : ""}`}
              />
              <FiSun className="absolute left-2 text-yellow-500 text-sm" />
              <FiMoon className="absolute right-2 text-indigo-300 text-sm" />
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div><ProfilePage/></div>
              
            ) : (
              <div className="flex items-center gap-4">
                {authLinks.map((nav) => (
                  <Link
                    key={nav.item}
                    href={nav.route}
                    className={`text-sm font-bold transition ${
                      nav.item === "Signup"
                        ? "bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                        : "text-gray-700 dark:text-gray-200 hover:text-blue-600"
                    }`}
                  >
                    {nav.item}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
