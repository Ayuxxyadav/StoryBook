"use client"
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../store/atoms/themeAtom"; 
import { useEffect } from "react";

export default function ThemeHandler({ children }: { children: React.ReactNode }) {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark"); // Yeh white mode wapas layega
    }
  }, [theme]);

  // Yahan se extra classes hata dein, sirf wrapper rakhein
  return <>{children}</>;
}