"use client"; // Yeh sabse zaroori hai

import React from "react";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}