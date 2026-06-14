"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/40 transition-shadow">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-bold text-neutral-700 dark:text-neutral-100">
            Work<span className="text-primary-500">Log</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
          >
            ฟีเจอร์
          </a>
          <a
            href="#promotions"
            className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
          >
            โปรโมชั่น
          </a>
          <a
            href="#about"
            className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
          >
            เกี่ยวกับ
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm text-neutral-500 hover:text-primary-600 transition-colors px-4 py-2"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            เริ่มต้นใช้งาน
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-500"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-600 animate-fade-in">
          <div className="px-6 py-4 space-y-3">
            <a
              href="#features"
              className="block text-sm text-neutral-500 hover:text-primary-500 py-2"
            >
              ฟีเจอร์
            </a>
            <a
              href="#promotions"
              className="block text-sm text-neutral-500 hover:text-primary-500 py-2"
            >
              โปรโมชั่น
            </a>
            <a
              href="#about"
              className="block text-sm text-neutral-500 hover:text-primary-500 py-2"
            >
              เกี่ยวกับ
            </a>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-neutral-400">ธีม</span>
              <ThemeToggle />
            </div>
            <hr className="border-neutral-100 dark:border-neutral-600" />
            <Link
              href="/login"
              className="block text-center text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-3 rounded-xl"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
