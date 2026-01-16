"use client";

import { Skeleton } from "@mui/material";
import {  Box, Card, CardContent } from "@mui/material";

export function NavbarSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4">
      <div className="mt-4 max-w-6xl mx-auto bg-white/70 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-lg rounded-2xl">
        <div className="px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Skeleton variant="text" width={120} height={32} />

          {/* Center links */}
          <div className="hidden md:flex gap-8">
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={90} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Skeleton variant="rounded" width={56} height={32} />
            <Skeleton variant="rounded" width={80} height={32} />
          </div>

        </div>
      </div>
    </div>
  );
}


