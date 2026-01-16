"use client";

import { Skeleton } from "@mui/material";
import {  Box, Card, CardContent } from "@mui/material";




export default function MyStoryBookSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-14 space-y-6">
      
      {/* Page Title */}
      <Skeleton
        variant="text"
        width={220}
        height={40}
        sx={{ bgcolor: "rgba(255,255,255,0.12)" }}
      />

      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          className="rounded-xl border border-white/10 
                     bg-white/10 dark:bg-black/20
                     backdrop-blur-xl p-5 space-y-3
                     shadow-lg"
        >
          {/* Title */}
          <Skeleton
            variant="text"
            width="60%"
            height={28}
            sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
          />

          {/* Description */}
          <Skeleton
            variant="text"
            width="100%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          />
          <Skeleton
            variant="text"
            width="80%"
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          />
        </Box>
      ))}
    </div>
  );
}

