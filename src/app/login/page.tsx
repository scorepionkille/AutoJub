"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

type RoleTab = "customer" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleTab>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock auth — accept any credentials
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      setLoading(false);
      return;
    }

    // Store mock user info
    localStorage.setItem(
      "worklog_user",
      JSON.stringify({
        name: role === "admin" ? "Admin User" : "สมชาย ใจดี",
        email,
        role,
      })
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-surface-dark relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-300/10 rounded-full blur-3xl" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up opacity-0">
        {/* Card */}
        <div className="bg-white dark:bg-surface-dark-secondary rounded-3xl shadow-2xl shadow-black/8 border border-neutral-200/50 dark:border-neutral-600/30 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-neutral-700 dark:text-neutral-100">
                Work<span className="text-primary-500">Log</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 dark:text-neutral-300">
              เข้าสู่ระบบในฐานะ
            </p>
          </div>

          {/* Role toggle */}
          <div className="flex bg-neutral-100 dark:bg-neutral-700/50 rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole("customer")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "customer"
                  ? "bg-white dark:bg-surface-dark-secondary text-primary-600 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-500"
              }`}
            >
              👤 ลูกค้า
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "admin"
                  ? "bg-white dark:bg-surface-dark-secondary text-primary-600 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-500"
              }`}
            >
              🛠 Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-1.5">
                อีเมล
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@email.com"
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/30 border border-neutral-200 dark:border-neutral-600/50 text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-300 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-1.5">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/30 border border-neutral-200 dark:border-neutral-600/50 text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-300 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-danger-400 bg-danger-50 dark:bg-danger-500/10 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-600/50" />
            <span className="text-xs text-neutral-300 dark:text-neutral-500">หรือ</span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-600/50" />
          </div>

          {/* Google SSO */}
          <button
            id="login-google"
            className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-200 dark:border-neutral-600/50 rounded-xl text-sm font-medium text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/30 hover:border-neutral-300 transition-all duration-200"
            onClick={() => {
              localStorage.setItem(
                "worklog_user",
                JSON.stringify({ name: "Google User", email: "user@gmail.com", role })
              );
              router.push("/dashboard");
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>

          <p className="text-center text-xs text-neutral-300 dark:text-neutral-500 mt-6">
            Role-based: ลูกค้า / Admin
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-primary-500 transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
