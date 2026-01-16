"use client"; // Yeh sabse zaroori hai

import React from "react";
import { RecoilRoot } from "recoil";



interface ProvidersProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}