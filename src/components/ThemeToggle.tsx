"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and first client render, always render the "light" state 
  // to perfectly match the server-rendered HTML.
  const isDark = mounted && theme === "dark";

  return (
    <button
      id="theme-toggle"
      onClick={mounted ? toggleTheme : undefined}
      className="relative w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 group"
      aria-label={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] transition-opacity duration-300 opacity-100 dark:opacity-40">
        ☀️
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] transition-opacity duration-300 opacity-40 dark:opacity-100">
        🌙
      </span>

      {/* Thumb */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md shadow-black/10 transition-all duration-300 ease-in-out flex items-center justify-center ${
          isDark ? "left-[calc(100%-1.625rem)]" : "left-0.5"
        }`}
      >
        <span className="text-[10px]">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}
