"use client";

import { FiUser, FiMail, FiLogOut } from "react-icons/fi";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/userAtom";
import { isLoggedInAtom } from "../../store/atoms/authAtom";
import { useRouter } from "next/navigation";

export function ProfilePage() {
  const user = useRecoilValue(userAtom);
  const resetUser = useResetRecoilState(userAtom);
  const resetAuth = useResetRecoilState(isLoggedInAtom);
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    resetUser();
    resetAuth();
    router.push("/auth/signin");
  }

  return (
    <div className="relative group">
      
      {/* ===== Avatar (Always Visible) ===== */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full 
                      bg-[#d9c5a0] text-white font-bold cursor-pointer">
        {user?.userName?.[0]?.toUpperCase() || <FiUser />}
      </div>

      {/* ===== Hover Card ===== */}
      <div
        className="absolute right-0 mt-2 w-52 
                   opacity-0 invisible group-hover:opacity-100 
                   group-hover:visible transition-all duration-200
                   bg-white dark:bg-gray-900 
                   border border-gray-200 dark:border-gray-700 
                   rounded-xl shadow-lg p-3 z-50"
      >
        {/* User Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-full 
                          bg-[#d9c5a0] text-white">
            <FiUser />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {user?.userName}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <FiMail />
              {user?.email}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 
                     text-sm text-red-600 hover:bg-red-50 
                     dark:hover:bg-red-900/30 
                     px-2 py-1.5 rounded-md transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}
 